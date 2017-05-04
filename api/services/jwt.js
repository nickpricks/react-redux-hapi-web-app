const jwt = require('jsonwebtoken');
const config = require('config');

exports.sign = (data, expiresIn = '7d') => jwt.sign(
  data,
  config.appSecret,
  { algorithm: 'HS256', expiresIn }
);

exports.verify = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, config.appSecret, (err, decoded) => {
    if (err) {
      return reject(err);
    }
    resolve(decoded);
  });
});
