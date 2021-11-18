const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const { name, link } = req.body;

  Movie.create({ name, link, owner: req.user._id })
    .then((movie) => {
      if (!movie) {
        throw new BadRequestError('Ошибка валидации');
      }
      res.send({ data: movie });
    })
    .catch((err) => next(err));
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const ownerId = req.user._id;
  Movie.findById(movieId)
    .orFail(() => {
      throw new NotFoundError('Фильм с указанным _id не найден');
    })
    .then((movie) => {
      if (ownerId.toString() === movie.owner._id.toString()) {
        Movie.deleteOne(movie).then(() => {
          res.send({ data: movie });
        });
      } else {
        throw new ForbiddenError('Недостаточно прав для удаления фильма');
      }
    })
    .catch((err) => next(err));
};
