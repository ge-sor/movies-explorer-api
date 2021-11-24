const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const { authValidation, loginValidation } = require('../middlewares/validator');

router.post('/signup', authValidation, createUser);

router.post('/signin', loginValidation, login);

module.exports = router;
