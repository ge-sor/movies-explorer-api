const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-err');
const { authErrorText } = require('../utils/errorTypes');

const { JWT_SECRET = 'DEFAULT_JWT_SECRET' } = process.env;
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new AuthError(authErrorText);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new AuthError(authErrorText);
  }
  req.user = payload;
  next();
};
