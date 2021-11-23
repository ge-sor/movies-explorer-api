const router = require('express').Router();
const auth = require('../middlewares/auth');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const authRoutes = require('./auth');
const NotFoundError = require('../errors/not-found-err');
const { notFoundText } = require('../utils/errorTypes');

router.use('/', authRoutes);

router.use('/users', auth, userRoutes);

router.use('/movies', auth, movieRoutes);

router.use('*', (req, res, next) => {
  next(new NotFoundError(notFoundText));
});

module.exports = router;
