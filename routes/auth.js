const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser, login } = require('../controllers/users');

router.post('/signup',
  celebrate({
    body: Joi.object().keys({
      password: Joi.string().required().min(6),
      email: Joi.string().required().email(),
      name: Joi.string().required().min(2).max(100),
    }),
  }),
  createUser);

router.post('/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }),
  }),
  login);

module.exports = router;