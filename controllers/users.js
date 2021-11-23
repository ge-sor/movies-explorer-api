const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AuthError = require('../errors/auth-err');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');

const { JWT_SECRET = 'DEFAULT_JWT_SECRET' } = process.env;

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    })
    .then((user) => {
      res.send({
        email: user.email,
        name: user.name,
      });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  User.findOne({ email }).then((find) => {
    if (find) {
      throw new ConflictError('Email уже используется');
    }
  }).catch(next);
  bcrypt.hash(password, 10).then((hash) => User.create({
      name, email, password: hash,
    })
      .then(() => {
        res.status(200).send({ message : 'Вы успешно зарегистрировались'})
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          throw new BadRequestError('Переданы некорректные данные');
        }
        if (err.code === 11000) {
          throw new ConflictError('Email уже используется');
        }
        return next(err)
      })).catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;
  User.findOne({ email }).then((find) => {
    if (find) {
      throw new ConflictError('Такой email уже занят' );
    }
  }).catch(next)
  User.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError('Пользователь с указанным id не найден');
    })
    .then((user) => {
      if (!user) {
        throw new BadRequestError('Ошибка валидации');
      }
      res.send({
        email: user.email,
        name: user.name,
      });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .orFail(() => {
      throw new AuthError('Неправильные почта или пароль');
    })
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((ok) => {
          if (!ok) {
            throw new AuthError('Неправильные почта или пароль');
          }
          const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
          res.send({ token });
        })
        .catch(next);
    })
    .catch(next);
};
