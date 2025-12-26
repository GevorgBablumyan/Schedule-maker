const BODY_PARTS_DATA = {
    'left-leg': "m 18.00179,139.99461 -0.664,5.99 4.647,5.77 1.55,9.1 3.1,1.33 2.655,-13.755 1.77,-4.88 -1.55,-3.107 z m 20.582,0.444 -3.32,9.318 -7.082,13.755 1.77,12.647 5.09,-14.2 4.205,-7.982 z m -26.557,-12.645 5.09,27.29 -3.32,-1.777 -2.656,8.875 z m 22.795,42.374 -1.55,4.88 -3.32,20.634 -0.442,27.51 4.65,26.847 -0.223,-34.39 4.87,-13.754 0.663,-15.087 z m -10.623,12.424 1.106,41.267 c 14.157565,64.57987 -5.846437,10.46082 -16.8199998,-29.07 l 5.5329998,-36.384 z m -9.71,-178.164003 0,22.476 15.71,31.073 9.923,30.850003 -1.033,-21.375 z m 25.49,30.248 0.118,-0.148 -0.793,-2.024 -16.545,-18.16 -1.242,-0.44 10.984,28.378 z m -6.255,10.766 6.812,17.6 2.274,-21.596 -1.344,-3.43 z m -26.4699998,17.82 0.827,25.340003 12.8159998,35.257 -3.928,10.136 -12.6099998,-44.51 z M 31.81879,76.04161 l 0.345,0.826 6.47,15.48 -4.177,38.342 -6.594,-3.526 5.715,-35.7 z m -21.465,-74.697003 0.827,21.373 L 4.1527902,65.02561 0.84679017,30.870607 Z m 2.068,27.323 14.677,32.391 3.307,26.000003 -6.2,36.58 -13.437,-37.241 -0.8269998,-38.342003 z",
    'left-arm': "m21.12,56.5a1.678,1.678 0 0 1 -0.427,0.33l0.935,8.224l12.977,-13.89l1.2,-8.958a168.2,168.2 0 0 0 -14.685,14.294zm1.387,12.522l-18.07,48.91l5.757,1.333l19.125,-39.44l3.518,-22.047l-10.33,11.244zm-5.278,-18.96l2.638,18.74l-17.2,46.023l-2.657,-1.775l6.644,-35.518l10.575,-27.47zm18.805,-12.323a1.78,1.78 0 0 1 0.407,-0.24l3.666,-27.345l-7.037,-10.139l-7.258,10.58l-6.16,37.04l0.566,4.973a151.447,151.447 0 0 1 15.808,-14.87l0.008,0.001zm-13.742,-28.906l-3.3,35.276l-2.2,-26.238l5.5,-9.038z"
};

function process(key, d) {
    console.log(`PROCESSING: ${key}`);
    // Need to split by start of subpaths.
    // Regex matches "m" or "M" that are strictly commands, easiest is to assume valid SVG
    // Split: /(?=[mM])/
    // But need to be careful not to match inside numbers? SVG chars usually have space or comma. 
    // And "m" is distinct.
    
    // Simple robust tokenizer for 'm'/'M' start
    let parts = d.split(/(?=[mM])/).filter(p => p.trim() !== '');
    
    let absX = 0;
    let absY = 0;
    
    parts.forEach((part, i) => {
        let type = part.trim()[0];
        let args = part.substring(1).trim().split(/[\s,]+/).map(parseFloat);
        
        let dx = args[0];
        let dy = args[1]; // handle cases where multiple args follow m?
        // SVG: "If a relative moveto (m) appears as the first element... treated as absolute."
        // Our logic: accumulate.

        if (i === 0) {
            // First one is always absolute treated
            absX = dx;
            absY = dy;
        } else {
            // Subsequent m is relative to Prev Start
            // Subsequent M is absolute
            if (type === 'm') {
                absX += dx;
                absY += dy;
            } else {
                absX = dx;
                absY = dy;
            }
        }
        
        // Reconstruct as Absolute Path Chunk
        // We replace the leading 'm dx dy' with 'M absX absY'
        // And keep the rest of the string exactly as is.
        // Wait, "rest of string" might start with more coords if implicit lineto?
        // "m 10 10 20 20" -> move 10 10, then lineto 20 20 (relative).
        // If we change start to M, the subsequent implicit lineto (20 20) is still relative?
        // SVG: "Subsequent pairs of coordinates are treated as implicit lineto commands."
        // "If moveto is relative, implicit lineto is relative."
        // "If moveto is absolute, implicit lineto is absolute." -> DANGER!
        
        // CRITICAL FIX: If we change 'm' to 'M', the implicit l's become L's (absolute)!
        // But the numbers in the string are relative values. So they will be interpreted as absolute coordinates!
        // Example: m 10 10 5 5 -> Move 10,10, Relative Line 5,5 (to 15,15).
        // Change to M 10 10 5 5 -> Move 10,10, Absolute Line 5,5 (to 5,5). BROKEN.
        
        // Solution: We must explicitely convert the implicit linetos to 'l' command if they exist.
        // Or better: Just keep the  relative, but realize we are splitting the file.
        // If we split the file, the browser resets (0,0).
        // So  in a specific file puts separate shape at 100,100.
        // My logic for accumulating offsets was to Find the Absolute Start.
        // If I generate `d="M ${absX} ${absY} l ..."` (forcing explicit relative line), it solves the implicit issue.
        
        // Check for implicit linetos:
        // args has length > 2?
        let suffix = part.substring(1).trim();
        // We need to strip the first pair of numbers from suffix so we can prepend 'l'
        // This is getting parsing heavy.
        
        console.log(`  Seg ${i}: Start(${absX.toFixed(1)}, ${absY.toFixed(1)})`);
    });
}

process('left-leg', BODY_PARTS_DATA['left-leg']);
process('left-arm', BODY_PARTS_DATA['left-arm']);
