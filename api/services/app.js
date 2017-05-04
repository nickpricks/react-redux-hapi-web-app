const db = require('../db/db');

exports.checkDbConnection = () => new Promise((resolve, reject) => {
  db
    .authenticate()
    .then(() => resolve('Database Connection has been established successfully.'))
    .catch(reject);
});
