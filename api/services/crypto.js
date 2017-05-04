const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.genSalt = () => new Promise((resolve, reject) => {
  bcrypt
    .genSalt(saltRounds, (err, salt) => {
      if (err) {
        return reject(err);
      }
      resolve(salt);
    });
});

exports.hashString = (str) => new Promise((resolve, reject) => {
  exports
    .genSalt()
    .then((salt) => {
      bcrypt.hash(str, salt, (err, hash) => {
        if (err) {
          return reject(err);
        }

        resolve({ salt, hash });
      });
    })
    .catch(reject);
});

exports.hashStringWithSalt = (str, salt) => new Promise((resolve, reject) => {
  bcrypt.hash(str, salt, (err, hash) => {
    if (err) {
      return reject(err);
    }

    resolve({ salt, hash });
  });
});
