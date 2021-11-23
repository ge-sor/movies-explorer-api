const validator = require('validator');
const { wrongURLText } = require('./errorTypes');

const isUrlCheck = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error(wrongURLText);
};

module.exports = isUrlCheck;
