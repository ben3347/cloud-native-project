const express = require("express");
const cors = require("cors");
require("dotenv").config();
var bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const app = express();
const port = 4000;
const URL = "http://localhost:8080";
const ADMIN_KEY = "661f3902287e950001c56e66:0831674c9aaae7b493dd17e27988c8fa0eb5bbabdf212e3f323b3c417a584e6f";

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
  const key = ADMIN_KEY;

  const [id, secret] = key.split(":");

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
  console.log(port, ": port");
  console.log(`listening on port ${port}`);
});