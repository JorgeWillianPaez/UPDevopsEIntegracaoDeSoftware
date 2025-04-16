const express = require('express');
const app = express();
const port = 3001;

const weatherData = {
  'sao-paulo': 25,
  'rio-de-janeiro': 34,
  'curitiba': 12,
  'salvador': 28,
};

app.get('/weather/:city', (req, res) => {
  const city = req.params.city;
  const temp = weatherData[city];

  if (temp === undefined) {
    return res.status(404).json({ error: 'Cidade não encontrada' });
  }

  res.json({
    city: city,
    temp,
    unit: 'Celsius'
  });
});

app.listen(port, () => {
  console.log(`API B (Clima) rodando em http://localhost:${port}`);
});
