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
const MOVIEURL = `http://34.118.235.3:3000/`;

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Route to serve HTML form for entering movie details
app.get("/input", (req, res) => {
  res.send(`
    <form action="/submit-movie-details" method="post">
      <label for="title">Title:</label><br>
      <input type="text" id="title" name="title"><br>
      <button type="submit">Submit</button>
    </form>
  `);
});

// Route to handle submission of movie details
app.post("/submit-movie-details", (req, res) => {
  const title = req.body.title;

  // Make a GET request to the movie microservice to fetch movie details
  axios.get(`${MOVIEURL}/movie/:${title}`)
    .then(response => {
      const movieDetails = response.data;
      // Process the movie details as needed
      console.log("Received movie details:", movieDetails);
      // Send the movie details back to the client
      res.json(movieDetails);
    })
    .catch(error => {
      console.error("Error fetching movie details:", error);
      res.status(500).send("Error fetching movie details");
    });
});

// // Route to handle submission of movie details
// app.post("/submit-movie-details", (req, res) => {
//   const title = req.body.title;

//   // Sample movie details data
//   const movieDetails = {
//     Title: title,
//     Year: 2009,
//     Director: "James Cameron",
//     Genre: ["Action", "Adventure", "Fantasy"],
//     Plot: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home."
//   };

//   const postData = {
//     title: movieDetails.Title,
//     html: `<p>Year: ${movieDetails.Year}</p><p>Director: ${movieDetails.Director}</p><p>Genre: ${movieDetails.Genre.join(', ')}</p><p>Plot: ${movieDetails.Plot}</p>`,
//     excerpt: "This is a short excerpt of my blog post."
//   };

// });

app.post("/post", (req, res) => {
  const [id, secret] = ADMIN_API_KEY.split(":");

  const token = jwt.sign({}, Buffer.from(secret, "hex"), {
    keyid: id,
    algorithm: "HS256",
    expiresIn: "5m",
    audience: `/admin/`,
  });

  const url = `${URL}/ghost/api/admin/posts/?source=html`;
  const headers = { Authorization: `Ghost ${token}` };
  const post = {
    title: movieDetails.Title,
    html: "<p>Ignore...</p>",
    status: "published",
    excerpt: "excerpt",
    tags: [{ name: "user" }],
  };
  const payload = { posts: [post] };

  axios
    .post(url, payload, { headers })
    .then((response) => res.send("post success"))
    .catch((error) => res.send(error));
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});