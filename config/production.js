const db = require('./db');

module.exports = {
  isProduction: true,
  host: '0.0.0.0',
  port: 8090,
  url: 'https://www.example.org',
  apiHost: '0.0.0.0',
  apiPort: 5000,
  db: db.production,
  appSecret: process.env.APP_SECRET || 'asdlkjasdjlklasdkjlkasdjasd',
  aws: {
    accessKeyId: process.env.AWS_KEY || 'wqewqeasdlkjasdjlklasdkjlkasdjasd',
    secretAccessKey: process.env.AWS_SECRET || 'poipiiasdlkjasdjlklasdkjlkasdjasd',
  }
};
