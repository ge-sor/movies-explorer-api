const mongoose = require('mongoose');
const { isEmail } = require('validator');
const { wrongEmailText } = require('../utils/errorTypes');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: (string) => isEmail(string),
      message: wrongEmailText,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
