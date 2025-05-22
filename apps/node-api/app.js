const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const host = '0.0.0.0';

app.get('/', (req, res) => {
  axios.get('flask_api').then(e => e.send('From flask api'));
  res.send('Hello World!');
});

app.listen(port, host, () => {
  console.log(`Example app listening at http://${host}:${port}`);
});