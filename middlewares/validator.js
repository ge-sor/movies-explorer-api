const { Joi, celebrate } = require('celebrate');
const isUrlCheck = require('../utils/isUrlCheck');

module.exports.authValidation = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required().min(6),
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(100),
  }),
});

module.exports.loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

module.exports.updateUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).email(),
    name: Joi.string().required().min(2).max(100),
  }),
});

module.exports.createMovieValidation = celebrate({
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
});

module.exports.deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});
