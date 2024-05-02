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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

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
    title: req.body.title,
    html: req.body.html,
    status: "published",
    excerpt: req.body.excerpt,
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