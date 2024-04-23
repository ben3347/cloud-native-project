const express = require('express');
const cors = require('cors');
const { dirname } = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3000; //this could be added to a config map

app.use(cors());

app.options("*", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.hearer('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Lenth, X-Requested-With');
    res.send(200);
})

// Get route that gives all data in movieDB.json
app.get('/', async (req, res) => {
  try {
      // Read the contents of the JSON file
      const fileContent = await fs.readFile('movieDB.json', 'utf-8');

      // Parse the JSON data
      const jsonData = JSON.parse(fileContent);

      // Send the JSON data as a response
      res.json(jsonData);
  } catch (error) {
      // If an error occurs, send an error response
      console.error('Error dumping JSON file:', error);
      res.status(500).json({ error: 'Error dumping JSON file' });
  }
});

app.all("*", (req, res) => {
  res.send("Invalid route");
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
  });

  