require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const baseError = require('./middlewares/baseError');
const { limiter } = require('./utils/rateLimit');

const { DB_MOVIES = 'mongodb://localhost:27017/moviesdb', PORT = 3000 } = process.env;

const app = express();
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(DB_MOVIES, {
  useNewUrlParser: true,
});
const allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://api.gesor-films.nomoredomains.work',
  'https://api.gesor-films.nomoredomains.work',
  'http://gesor-films.nomoredomains.rocks',
  'https://gesor-films.nomoredomains.rocks',
];
app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }

  next();
});
app.use(helmet());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(baseError);

app.listen(PORT, () => {
  console.log(`App on port ${PORT}`);
});
