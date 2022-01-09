const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const ConflictError = require('../errors/conflict-err');
const {
  conflictMovieText,
  badRequestText,
  notFoundMovieText,
  forbiddenDeleteText,
} = require('../utils/errorTypes');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    movieId,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
  } = req.body;
  Movie.find({ movieId }).then((find) => {
    const userId = req.user._id;
    if (find.find((i) => i.owner.toString() === userId)) {
      throw new ConflictError(conflictMovieText);
    } else {
      Movie.create({
        movieId,
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        thumbnail,
        nameRU,
        nameEN,
        owner: req.user._id,
      })
        .then((movie) => {
          if (!movie) {
            throw new BadRequestError(badRequestText);
          }
          res.send({ data: movie });
        })
        .catch(next);
    }
  }).catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError(notFoundMovieText);
    })
    .then((movie) => {
      if (req.user._id.toString() === movie.owner.toString()) {
        Movie.deleteOne(movie)
          .then(() => res.status(200).send({ message: 'Фильм удален' }))
          .catch(next);
      } else {
        throw new ForbiddenError(forbiddenDeleteText);
      }
    })
    .catch(next);
};
