const path = require('path');
process.env.NODE_CONFIG_DIR = path.join(__dirname, '../config');

const i18n = require('i18n');
const appHealth = require('./services/app');
const logger = require('./services/logger');

// Glue server
const Glue = require('glue');
const manifest = require('./manifest');

// Locale Settings
i18n.configure({
  locales: ['en'],
  defaultLocale: 'en',
  directory: path.resolve(__dirname, '..', 'locales'),
  autoReload: true,
  objectNotation: true
});

Glue.compose(manifest, { relativeTo: path.join(__dirname) }, (err, server) => {
  if (err) {
    return console.error(err.stack || err);
  }

  server.on('log', logger);

  const healthCheck = () => Promise.all([
    appHealth.checkDbConnection(),
  ]);

  // Health route
  server.route({
    path: '/',
    method: 'get',
    handler: (request, reply) => {
      reply(i18n.__('db.error'));
    },
  });

  // Health route
  server.route({
    path: '/heart-beat',
    method: 'get',
    handler: (request, reply) => {
      healthCheck()
        .then((res) => {
          global.console.info('== api-heart-beat ==> ', res);
          reply(i18n.__('heart-beat'));
        })
        .catch(reply);
    },
  });

  // Check health and START SERVER
  healthCheck()
    .then(() => {
      server.start((healtErr) => {
        if (healtErr) {
          return logger.error(healtErr);
        }

        const info = server.select('api').connections[0].info;
        server.log(['info'], `== Started api at ${info.uri} ==`);
      });
    })
    .catch((healtErr) => server.log(['error'], healtErr));
});
