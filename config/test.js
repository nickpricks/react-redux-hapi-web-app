const db = require('./db');

module.exports = {
  isProduction: false,
  host: 'localhost',
  port: 8080,
  url: 'http://localhost:3000',
  apiHost: 'localhost',
  apiPort: 5000,
  db: db.test,
  aws: {
    useAmiRole: false,
    accessKeyId: '',
    secretAccessKey: '',
  }
}
