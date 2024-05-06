const express = require('express');
const cors = require('cors');
const { dirname } = require('path');
const fs = require('fs').promises;
const { manualPost } = require('./manualPost');
const { randomPost } = require('./randomPost');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.options("*", (req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.hearer('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Authorization, Content-Lenth, X-Requested-With');
  res.send(200);
})

// GET route that gives all data in movieDB.json
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
    console.error('Error returning JSON file:', error);
    res.status(500).json({ error: 'Error returning JSON file' });
  }
});

// GET route that gives the last element in movieDB.json
app.get('/lastElement', async (req, res) => {
  try {
    // Read the contents of the JSON file
    const fileContent = await fs.readFile('movieDB.json', 'utf-8');

    // Parse the JSON data
    const movieData = JSON.parse(fileContent);

    // Get the last element of the array
    const lastMovie = movieData[movieData.length - 1];

    // Send the last movie as the response
    res.send(lastMovie);

  } catch (error) {
    // If an error occurs, send an error response
    console.error('Error retrieving last element JSON file:', error);
    res.status(500).json({ error: 'Error retrieving last element JSON file' });

  }

});

// GET route that gets and then deletes the first element 
app.get('/getAndDeleteFirstElement', async (req, res) => {
  try {
    // Read the contents of the JSON file
    const fileContent = await fs.readFile('movieDB.json', 'utf-8');

    // Parse the JSON data
    const movieData = JSON.parse(fileContent);

    // Sends error if DB is empty 
    if (movieData.length === 0) {
      res.status(404).send('No movies found');
      return;
    }

    // Retrieves and removes first movie 
    const firstMovie = movieData[0];
    movieData.shift();

    // Write the updated JSON data back to the file
    fs.writeFile('movieDB.json', JSON.stringify(movieData, null, 2), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

    });

    // Send the first movie as the response
    res.send(firstMovie);

  } catch (error) {

    // If an error occurs, send an error response
    console.error('Error retrieving and deleting first element JSON file:', error);
    res.status(500).json({ error: 'Error retrieving and deleting last element JSON file' });

  }

});

// GET route that fetches specific movie information by its title 
app.get('/movie/:title', async (req, res) => {
  const title = req.params.title.toLowerCase();

  try {
    const data = await fs.readFile('movieDB.json', 'utf-8');

    try {
      const movies = JSON.parse(data);
      const movie = movies.find(movie => movie.Title.toLowerCase() === title);

      if(!movie){
        return res.status(404).json({ error: 'Movie not found' });
      } else {
        console.log(`${title} successful found`);
        res.json(movie);
      }

    }
    catch (error) {
      console.error('Error parsing JSON data:', error);
    }
  }
  catch (error) {
    console.error('Error reading JSON data:', error);
  }

})


// GET route that runs the function manualPost()
app.get('/manualPost', async (req, res) => {
  try {

    const result = manualPost();
    res.send("Top 5 movies added to MoviesDB.json");

  } catch (error) {
    console.error('Error processing movie:', error);
    res.status(500).send('Internal Server Error');

  }

});

// Get route that runs the function randomPost()
app.get('/randomPost', async (req, res) => {
  try {

    const result = randomPost();
    res.send("Random Movie was added to MoviesDB.json");

  } catch (error) {
    console.error('Error processing movie:', error);
    res.status(500).send('Internal Server Error');

  }

})

//get route that clears the movieDB
app.get('/clearDB', async (req, res) => {
  fs.writeFile('movieDB.json', JSON.stringify([], null, 2), (err) => {
    if (err) {
      console.error('Error clearing file:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
  })

  console.log("MoviesDB.json cleared successfully");
  res.send("MoviesDB.json cleared successfully");

});

app.all("*", (req, res) => {
  res.send("Invalid route");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});

