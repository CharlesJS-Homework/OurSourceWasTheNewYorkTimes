const express = require('express');
const db = require('../models');
const SocketIO = require('socket.io');

let io;

function notifyDBChanged() {
  io.emit('dbChanged');
}

module.exports = (http) => {
  io = SocketIO(http);

  const router = express.Router();

  router.get('/articles', (req, res, next) => {
    db.Article.find().then(results => res.json(results)).catch(next);
  });

  router.post('/articles', (req, res, next) => {
    db.Article.create(req.body)
      .then(() => notifyDBChanged())
      .then(() => res.json(req.body))
      .catch(next);
  });

  router.delete('/articles/:id', (req, res, next) => {
    db.Article.findByIdAndRemove(req.params.id)
      .then(() => notifyDBChanged())
      .then(() => res.json('Success'))
      .catch(next);
  });

  return router;
};
