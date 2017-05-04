require('babel-polyfill');

const defaultConfig = require('../config/default');
const devConfig = require('../config/development');
const prodConfig = require('../config/production');

const environment = {
  development: {
    isProduction: false,
    url: devConfig.url,
    host: devConfig.host,
    port: devConfig.port,
    apiHost: devConfig.apiHost,
    apiPort: devConfig.apiPort,
  },
  production: {
    isProduction: true,
    url: prodConfig.url,
    host: prodConfig.host,
    port: prodConfig.port,
    apiHost: prodConfig.apiHost,
    apiPort: prodConfig.apiPort,
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign(
  {
    app: defaultConfig.app,
  },
  environment
);
