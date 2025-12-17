import http from 'http';

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/generate',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const response = JSON.parse(data);
    console.log('Bot:', response.reply);
  });
});

req.on('error', (e) => {
  console.error(`Error: ${e.message}`);
});

const payload = JSON.stringify({ prompt: 'What is 2+2?' });
req.write(payload);
req.end();
