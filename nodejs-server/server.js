const express = require('express');
const app = express();

const port = 3000;

app.get('/', (req, res) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  res.send(`Hola mundo\n`);
  res.end();
});

app.get('/health', (req, res) => {
  console.log(`Received health-check request: ${req.method} ${req.url}`);
  res.send(`I'm alive!\n`);
  res.end();
});

app.listen(port, () => console.log(`NodeJS express server listening on port ${port}`));

