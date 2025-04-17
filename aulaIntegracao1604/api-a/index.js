const express = require('express');
const axios = require('axios');
const app = express();
const redis = require('redis');
const port = 3000;

const WEATHER_API_URL = 'http://localhost:3001/weather';

const redisClient = redis.createClient();

redisClient.on('error', (err) => {
    console.error('Erro no Redis:', err);
});

(async () => {
    await redisClient.connect();
})();

app.get('/recommendation/:city', async (req, res) => {
  const city = req.params.city;

  try {

    const cachedData = await redisClient.get(city);

    if (cachedData) {
      console.log(`Carregando cidade usando o cache`);
      return res.json(JSON.parse(cachedData));
    }

    const response = await axios.get(`${WEATHER_API_URL}/${city}`);
    const { city: cityName, temp, unit } = response.data;

    let recommendation = '';
    if (temp > 30) {
      recommendation = 'Está muito quente! Beba bastante água e use protetor solar.';
    } else if (temp > 15) {
      recommendation = 'O clima está agradável. Aproveite o dia!';
    } else {
      recommendation = 'Está frio! Não esqueça de usar um casaco.';
    }

    const result = { city: cityName, temp, unit, recommendation };

    await redisClient.setEx(city, 60, JSON.stringify(result));

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados do clima' });
  }
});

app.listen(port, () => {
  console.log(`API A (Recomendação) rodando em http://localhost:${port}`);
});
