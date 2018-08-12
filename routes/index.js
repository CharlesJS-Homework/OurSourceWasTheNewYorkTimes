const express = require('express');
const path = require('path');

const router = express.Router();

/* GET home page. */
router.get('*', (req, res) => {
  if (process.env.MONGODB_URI) {
    res.sendFile(path.join(__dirname, '../app/build/index.html'));
  } else {
    res.sendFile(path.join(__dirname, '../app/public/index.html'));
  }
  // res.render('index', { title: 'Express' });
});

module.exports = router;
