const joi = require('joi');
const boom = require('boom');
const config = require('config');
const i18n = require('i18n');

const logger = require('../services/logger');
const accountService = require('../services/accountService');

const pathPrefix = '/sessions';

module.exports = [

  {
    path: `${pathPrefix}`,
    method: 'GET',
    config: {
      auth: 'default',
      handler: (request, reply) => {
        reply(request.auth.credentials);
      },
    },
  },

  {
    path: `${pathPrefix}`,
    method: 'POST',
    config: {
      validate: {          // Route validations check
        payload: {
          username: joi.string().max(250).required(),
          password: joi.string().max(250).required()
        },
        options: { abortEarly: false },
      },
      handler: (request, reply) => {
        const payload = request.payload;

        accountService
          .authenticate(payload.username, payload.password)
          .then(user => {
            if (user && user.role === config.roles.USER && !user.isActive) {
              return reply(boom.badRequest(i18n.__('db.user.inActive')));
            }

            if (request.query.jwt) {
              const accessToken = request.server.plugins.mixedAuth.jwtToken(user);
              reply({ user, accessToken });
            } else {
              request.auth.session.set(user);
              reply({ user });
            }
          })
          .catch(err => {
            logger.error(err);
            reply(boom.badRequest(err));
          });
      },
    },
  },

  {
    path: `${pathPrefix}`,
    method: 'DELETE',
    config: {
      auth: 'default',
      handler: (request, reply) => {
        request.auth.session.clear();
        logger.info('=== session deleted...');
        reply({ success: true });
      },
    },
  },

];
