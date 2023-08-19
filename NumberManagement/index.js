const express = require('express');
const axios = require('axios');
const app = express();
const port = 8008;

app.get('/numbers', async (req, res) => {
  const urls = req.query.url;
  
  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ error: 'No URL params' });
  }
  
  const pms = urls.map(async (url) => {

      const response = await axios.get(url);
      const data = response.data;
      if (data && data.numbers && Array.isArray(data.numbers)) {
        return data.numbers;
      } 
  });

  try {
    const arr = await Promise.all(pms);
    const final = arr.reduce((a, res) => a.concat(res), []);
    const finalNumbers = [...new Set(final)].sort((a, b) => a - b);
    res.json({ numbers: finalNumbers });
  } catch (error) {
    
  }
});

app.listen(port, () => {
  console.log(`Service running on port ${port}`);
});