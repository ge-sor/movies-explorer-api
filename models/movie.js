const mongoose = require('mongoose');
const { isURL } = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (string) => isURL(string),
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (string) => isURL(string),
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (string) => isURL(string),
    },
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    refs: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
    minlength: 1,
  },
});

module.exports = mongoose.model('movie', movieSchema);
