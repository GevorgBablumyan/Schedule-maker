const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');

function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `message ${sender}`;
    div.innerText = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    userInput.value = '';

    try {
        const resp = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: message })
        });

        const data = await resp.json();
        if (!resp.ok) {
            const err = data?.error || JSON.stringify(data);
            addMessage(`Error: ${err}`, 'bot');
            return;
        }

        const botReply = data.reply || 'No response from Gemini.';
        addMessage(botReply, 'bot');
    } catch (error) {
        addMessage('Error connecting to server.', 'bot');
        console.error(error);
    }
}
