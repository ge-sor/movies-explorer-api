const mongoose = require('mongoose');
const { isUrl } = require('validator');

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
      validator: (string) => isUrl(string),
      message: 'Неверный формат URL постера',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (string) => isUrl(string),
      message: 'Неверный формат URL трейлера',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (string) => isUrl(string),
      message: 'Неверный формат URL thumbnail',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    refs: 'user',
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    refs: 'movie',
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
