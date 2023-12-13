// server.js

const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/check-website', async (req, res) => {
  const url = req.query.url;

  try {
    const response = await axios.get(url);
    res.status(response.status).json({ isOnline: true });
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({ isOnline: false });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
