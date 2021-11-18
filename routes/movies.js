const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const isUrlCheck = require('../utils/isUrlCheck');

router.get('/',
  getMovies);

router.post('/',
  celebrate({
    body: Joi.object().keys({
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

router.delete('/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().hex().length(24).required(),
    }),
  }),
  deleteMovie);

module.exports = router;
