const rateLimit = require('express-rate-limit');

module.exports.limiter = rateLimit({
  windowMs: 800000,
  max: 100,
});
