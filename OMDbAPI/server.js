const express = require('express');
const cors = require('cors');
const { dirname } = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const post = require('./routes/post');

app.use('/post', post);
app.use(cors());

app.options("*", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.hearer('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Lenth, X-Requested-With');
    res.send(200);
})

app.use(express.json());

app.use(express.urlencoded({ extended: false }));


app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

// https://www.youtube.com/watch?v=bC5KVrX-AlA&ab_channel=DaveGray 
// https://www.youtube.com/watch?v=GjvZdrgX87A&ab_channel=DevSprout


app.all("*", (req, res) => {
  res.send("Invalid route");
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
  });

  