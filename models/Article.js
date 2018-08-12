const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  _id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Article', ArticleSchema);
