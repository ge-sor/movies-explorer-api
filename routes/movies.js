const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const isUrlCheck = require('../utils/isUrlCheck');

router.get('/movies',
  getMovies);

router.post('/movies',
  celebrate({
    body: Joi.object().keys({
      movieId: Joi.number().required(),
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().length(4).required(),
      description: Joi.string().required(),
      image: Joi.string().required().custom(isUrlCheck),
      trailer: Joi.string().required().custom(isUrlCheck),
      thumbnail: Joi.string().required().custom(isUrlCheck),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie);

router.delete('/movies/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().hex().length(24),
    }),
  }),
  deleteMovie);

module.exports = router;
