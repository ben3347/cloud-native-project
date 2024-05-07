const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const port = 4000;

// Load environment variables from ConfigMap
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;
const GHOST_HOST = process.env.GHOST_HOST;
const GHOST_PORT = process.env.GHOST_PORT;

const URL = `http://${GHOST_HOST}:${GHOST_PORT}`;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(bodyParser.text({ limit: "200mb" }));

// Route to serve HTML form for entering movie details
app.get("/", (req, res) => {
  res.send(`
    <form action="/submit-movie-details" method="post">
      <label for="title">Title:</label><br>
      <input type="text" id="title" name="title"><br>
      <button type="submit">Submit</button>
    </form>
  `);
});

let movieDetails;

// Route to handle submission of movie details
app.post("/submit-movie-details", (req, res) => {
  const movieTitle = req.body.title;

  // Fetch movie details from the microservice
  fetchMovieDetails(movieTitle)
    .then((movieDetails) => {
     console.log(movieDetails);
    })
    .then(() => {
      // Send the movie details back to the client
      res.json(movieDetails);
    })
    .catch((error) => {
      console.error("Error processing request:", error);
      res.status(500).send("Error processing request");
    });

  console.log("Received movie details", movieDetails);

  // Posting to Ghost
  postToGhost(movieDetails)
    .then(() => {
      // Send the movie details back to the client
      res.json(movieDetails);
    })
    .catch((error) => {
      console.error("Error posting to Ghost:", error);
      res.status(500).send("Error posting to Ghost");
    });

    
});

// Function to fetch movie details from the microservice
function fetchMovieDetails(movieTitle) {
  return new Promise((resolve, reject) => {
    // Construct URL to fetch movie details
    const movieURL = `http://34.118.230.55:3000/movie/${encodeURIComponent(movieTitle)}`;

    // Make GET request to fetch movie details
    axios.get(movieURL)
      .then((response) => {
        resolve(response.data); // Resolve with movie details
      })
      .catch((error) => {
        reject(error); // Reject with error if request fails
      });
  });
}

// Function to post to Ghost
function postToGhost(movieDetails) {
  return new Promise((resolve, reject) => {
    const [id, secret] = ADMIN_API_KEY.split(":");
    const token = jwt.sign({}, Buffer.from(secret, "hex"), {
      keyid: id,
      algorithm: "HS256",
      expiresIn: "5m",
      audience: `/admin/`,
    });
    const url = `${URL}/ghost/api/admin/posts/?source=html`;
    const headers = { Authorization: `Ghost ${token}` };

    const htmlContent = `
      <h2>(${movieDetails.Year}) - ${movieDetails.Rated}</h1>
      <p><strong>Genre:</strong> ${movieDetails.Genre}</p>
      <p><strong>Director:</strong> ${movieDetails.Director}</p>
      <p>${movieDetails.Plot}</p>

      <p> "Avatar" is a groundbreaking cinematic achievement that transports viewers to a mesmerizing realm filled with wonder and adventure. From the breathtaking landscapes of Pandora to the intricately designed creatures that inhabit it, every frame of the film is a testament to James Cameron's visionary storytelling and unparalleled imagination.
      At its core, "Avatar" is a captivating tale of discovery, identity, and the clash between civilizations. The film masterfully explores themes of environmentalism, colonialism, and the power of unity in the face of adversity, resonating with audiences on a profound level.
      The visual effects are nothing short of extraordinary, pushing the boundaries of technology to create a fully immersive and immersive experience. The lush jungles, towering mountains, and bioluminescent flora and fauna of Pandora are brought to life with stunning realism, making it feel like a living, breathing world.
      The performances are equally impressive, with Sam Worthington delivering a compelling portrayal of Jake Sully, a reluctant hero torn between two worlds. Zoe Saldana shines as Neytiri, imbuing her character with grace, strength, and depth. The chemistry between the two leads is palpable, anchoring the emotional core of the film.
      While the narrative may follow familiar beats of the classic hero's journey, it is executed with such finesse and heart that it feels fresh and exhilarating. The action sequences are exhilarating, the drama is gripping, and the message is timely and thought-provoking.
      In conclusion, "Avatar" is a cinematic triumph that continues to captivate audiences with its timeless story, groundbreaking visuals, and universal themes. It is a testament to the power of cinema to transport us to new worlds and inspire us to dream, explore, and connect with one another. A must-see for fans of epic storytelling and immersive filmmaking.
      </p>
    `;

    const post = {
      title: movieDetails.Title,
      html: htmlContent,
      status: "published",
      excerpt: "excerpt",
      tags: [{ name: "user" }],
    };
    const payload = { posts: [post] };

    axios
      .post(url, payload, { headers })
      .then((response) => {
        console.log("Post to Ghost successful");
        resolve();
      })
      .catch((error) => {
        console.error("Error posting to Ghost:", error);
        reject(error);
      });
  });
}

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
