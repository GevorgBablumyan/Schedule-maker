const BODY_PARTS_DATA = {
    'chest': "M19.32 0l-9.225 16.488-10.1 5.056 6.15 4.836 4.832 14.07 11.2 4.616 17.85-8.828-4.452-34.7zm47.934 0l9.225 16.488 10.1 5.056-6.15 4.836-4.833 14.07-11.2 4.616-17.844-8.828 4.45-34.7z",
    'stomach': "M19.25 7.49l16.6-7.5-.5 12.16-14.943 7.662zm-10.322 8.9l6.9 3.848-.8-9.116zm5.617-8.732L1.32 2.15 6.3 15.6zm-8.17 9.267l9.015 5.514 1.54 11.028-8.795-5.735zm15.53 5.89l.332 8.662 12.286-2.665.664-11.826zm14.61 84.783L33.28 76.062l-.08-20.53-11.654-5.736-1.32 37.5zM22.735 35.64L22.57 46.3l11.787 3.166.166-16.657zm-14.16-5.255L16.49 35.9l1.1 11.25-8.8-7.06zm8.79 22.74l-9.673-7.28-.84 9.78L-.006 68.29l10.564 14.594 5.5.883 1.98-20.735zM56 7.488l-16.6-7.5.5 12.16 14.942 7.66zm10.32 8.9l-6.9 3.847.8-9.116zm-5.617-8.733L73.93 2.148l-4.98 13.447zm8.17 9.267l-9.015 5.514-1.54 11.03 8.8-5.736zm-15.53 5.89l-.332 8.662-12.285-2.665-.664-11.827zm-14.61 84.783l3.234-31.536.082-20.532 11.65-5.735 1.32 37.5zm13.78-71.957l.166 10.66-11.786 3.168-.166-16.657zm14.16-5.256l-7.915 5.514-1.1 11.25 8.794-7.06zm-8.79 22.743l9.673-7.28.84 9.78 6.862 12.66-10.564 14.597-5.5.883-1.975-20.74z"
};

function generate(key, d, threshold, axis = 'y') {
    // Basic tokenizer for path data
    // Splits by command letters but keeps them
    let parts = d.split(/(?=[mM])/).filter(p => p.trim() !== '');
    let absX = 0;
    let absY = 0;

    let group1Path = '';
    let group2Path = '';

    parts.forEach((part, i) => {
        let type = part.trim()[0];
        let argsContent = part.substring(1).trim();

        // Handle potentially combined numbers without spaces e.g. "0.5-0.5" -> "0.5 -0.5"
        // Also handling scientific notation 10e-4 if present (simplified here)
        let cleanArgs = argsContent.replace(/([0-9])-/g, '$1 -'); // split 1-1 to 1 -1
        let args = cleanArgs.split(/[\s,]+/).map(parseFloat);

        // Safety: if first chunk is missing args (shouldn't happen for m/M)
        if (args.length < 2) return;

        let dx = args[0];
        let dy = args[1];

        // Determine Absolute Start of this Subpath
        let startX, startY;

        if (i === 0) {
            // First command is always treated as absolute move in SVG path logic
            // (even if 'm', the first one is absolute)
            absX = dx;
            absY = dy;
            type = 'M'; // Force absolute for our tracking
            startX = dx;
            startY = dy;
        } else {
            if (type === 'm') {
                // Relative to PREVIOUS subpath start? 
                // SVG Spec: "If a relative moveto (m) appears as the first element of the path, then it is treated as a pair of absolute coordinates. In all other cases, it is processed as relative to the current point"
                // The "current point" after a 'z' (closepath) is the initial point of the generic subpath.
                // Assuming all our chunks end with 'z'.
                // If they don't, this logic might be slightly off, but let's assume valid "blob" standard.
                startX = absX + dx;
                startY = absY + dy;

                // Update tracker
                absX = startX;
                absY = startY;
            } else {
                // Absolute 'M'
                absX = dx;
                absY = dy;
                startX = dx;
                startY = dy;
            }
        }

        // Reconstruct the chunk as absolute M start
        // To preserve the shape, we convert "m dx dy rest" -> "M startX startY l rest"
        // If "M x y rest" -> "M x y L rest"

        // Find the "rest" of the string (commands after the first coordinate pair)
        // We used simple regex split before, let's reuse valid suffix logic.
        // We need to strip the first distinct coordinate pair from the string.

        // Regex to find the first coordinate pair:
        // [mM] \s* number \s* [,]? \s* number
        let headerRegex = /^[mM][\s]*[+-]?[\d.]+(?:[eE][+-]?\d+)?[\s,]*[+-]?[\d.]+(?:[eE][+-]?\d+)?/;
        let match = part.match(headerRegex);
        let tail = '';
        if (match) {
            tail = part.substring(match[0].length).trim();
        }

        // If tail starts with a number, we need an explicit line command.
        // If original was 'm', implied command is 'l'. If 'M', 'L'.
        let implicitCmd = (type === 'm' && i > 0) ? 'l' : 'L';
        // But wait, if we converted start to Absolute M, the implicit following commands:
        // If original was "m 10 10 20 20", it meant "move rel 10 10, then line rel 20 20".
        // If we write "M absX absY l 20 20", "l" allows relative line. So that works!
        // If original was "M 10 10 20 20", meant "move abs 10 10, then line abs 20 20".
        // If we write "M 10 10 L 20 20", "L" allows absolute line.

        // HOWEVER, if i===0, "m" is treated as absolute. So implicit command is 'l' (relative)? No, 'L' (absolute)?
        // SVG Spec: "If a relative moveto (m) appears as the first element... treated as absolute... subsequent coordinate pairs are treated as relative lineto commands".
        // So: "m 10 10 20 20" -> Move Abs 10 10, Line Rel 20 20.
        // So we should ALWAYS use 'l' for 'm' and 'L' for 'M', EXCEPT if we rewrite the M.

        // Simplification: Just paste the tail.
        // But if tail starts with number, we MUST insert the command letter because we are resetting the mode with a new "M".
        // Actually, "M x y 10 10" works? No, M implies L. 
        // "M x y l 10 10" is mixed?
        // Let's rely on standard:
        // "m dx dy" -> implicit l
        // "M x y" -> implicit L

        let newChunk = `M ${startX} ${startY}`;
        if (tail.length > 0) {
            // Check if tail starts with number
            if (/^[+\-.\d]/.test(tail)) {
                // Use 'l' if original was lowercase m, 'L' if uppercase M.
                // For i=0, original 'm' implies 'l' (relative).
                // So:
                let cmd = (part.trim()[0] === 'm') ? 'l' : 'L';
                newChunk += ` ${cmd} ${tail}`;
            } else {
                newChunk += ` ${tail}`;
            }
        }

        // Classification
        let val = (axis === 'y') ? absY : absX;

        if (val < threshold) {
            group1Path += newChunk + ' ';
        } else {
            group2Path += newChunk + ' ';
        }
    });

    return { group1: group1Path.trim(), group2: group2Path.trim() };
}

console.log('--- CHEST ---');
// Split by X axis. Width 86. Mid ~43.
const chest = generate('chest', BODY_PARTS_DATA['chest'], 43, 'x');
console.log('LEFT:', chest.group1);
console.log('RIGHT:', chest.group2);

console.log('--- STOMACH ---');
// Split by Y axis. Height 107. 
// abs-upper vs abs-lower. Threshold ~50 (relative to top 0)
const stomach = generate('stomach', BODY_PARTS_DATA['stomach'], 50, 'y');
console.log('UPPER:', stomach.group1);
console.log('LOWER:', stomach.group2);

