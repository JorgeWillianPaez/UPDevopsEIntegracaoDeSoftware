const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const WEATHER_API_URL = 'http://localhost:3001/weather';

app.get('/recommendation/:city', async (req, res) => {
  const city = req.params.city;

  try {
    const response = await axios.get(`${WEATHER_API_URL}/${city}`);
    const { temp, unit } = response.data;

    let recommendation = '';
    if (temp > 30) {
      recommendation = 'Está muito quente! Beba bastante água e use protetor solar.';
    } else if (temp > 15) {
      recommendation = 'O clima está agradável. Aproveite o dia!';
    } else {
      recommendation = 'Está frio! Não esqueça de usar um casaco.';
    }

    res.json({
      city: response.data.city,
      temp,
      unit,
      recommendation
    });

  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados do clima' });
  }
});

app.listen(port, () => {
  console.log(`API A (Recomendação) rodando em http://localhost:${port}`);
});
