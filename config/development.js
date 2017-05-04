const db = require('./db');
const HOST = 'localhost';
const PORT = '3000';

module.exports = {
  isProduction: false,
  host: HOST,
  port: PORT,
  url: `http://${HOST}:${PORT}`,
  apiHost: 'localhost',
  apiPort: 5000,
  db: db.development,
  appSecret: 'dhiekhd$RFEWerweTyuFSFGdGHH879o8iuyjrhte',
  aws: {
    accessKeyId: '',
    secretAccessKey: '',
  }
};
