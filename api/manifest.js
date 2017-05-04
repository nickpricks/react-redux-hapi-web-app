const config = require('config');
const userRoles = config.roles;

module.exports = {
  server: {},
  connections: [
    {
      host: config.apiHost,
      port: config.apiPort,
      labels: ['api'],
    },
  ],
  registrations: [
    {
      plugin: {
        register: 'hapi-boom-decorators',
        options: {}
      }
    },

    {
      plugin: {
        register: 'yar',
        options: {
          storeBlank: false,
          cookieOptions: {
            password: config.appSecret,
            isSecure: false,
            isHttpOnly: true
          }
        }
      }
    },

    {
      plugin: {
        register: './services/auth',
        options: {
          secret: config.appSecret,
          isSecure: false
        },
      },
    },

    {
      plugin: {
        register: 'acquaint',
        options: {
          relativeTo: __dirname,
          routes: [
            {
              includes: ['controllers/**/*Controller.js'],
            },
          ],
        },
      },
    },

    {
      plugin: {
        register: 'hapi-authorization',
        options: {
          roles: [
            userRoles.ADMIN
          ],
        },
      },
    },

    {
      plugin: {
        register: 'hapi-io',
        options: {}
      }
    },

    {
      plugin: {
        register: 'good',
        options: {
          reporters: {
            console: [
              {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ log: '*', response: '*', error: '*' }]
              },
              {
                module: 'good-console',
              },
              'stdout',
            ],
          },
        },
      },
    },

  ],
};
