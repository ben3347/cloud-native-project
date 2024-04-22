const express = require('express');
const router = express.Router();

/* GET posts */
app.get('/', (req, res, next) => {
    res.send('/post');
  });

/* POST posts create /posts */
app.post('/', (req, res, next) => {
    res.send('CREATE /post');
  });

module.exports = router; 