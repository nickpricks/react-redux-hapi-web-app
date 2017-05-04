const assert = require('assert');
const Boom = require('boom');
const i18n = require('i18n');
const jwtUtil = require('./jwt');
const db = require('../db');

const internals = {};

exports.register = (server, options, next) => {
  server.auth.scheme('mixedAuth', internals.implementation);
  server.expose('jwtToken', internals.jwtToken);

  // Auth config
  const api = server.select('api');
  api.auth.strategy('default', 'mixedAuth', 'try', {
    secret: options.secret,
    isSecure: options.isSecure
  });

  next();
};

exports.register.attributes = {
  name: 'mixedAuth'
};

internals.implementation = (server, options) => {
  assert(options, i18n.__('function.missingArg', 'auth.implementation', 'options'));
  assert(options, i18n.__('function.missingArg', 'auth.implementation', 'options.secret'));

  const settings = Object({}, options);

  settings.sessionKey = 'AUTH_USER';
  internals.settings = settings;

  internals.jwtAuth = internals.jwtScheme(settings);

  server.ext('onPreAuth', (request, reply) => {
    request.auth.session = {
      user: null,
      set: (user) => {
        request.yar.set(settings.sessionKey, internals.authCredentials(user));
      },
      clear: () => {
        request.yar.clear(settings.sessionKey);
      }
    };

    return reply.continue();
  });


  return { authenticate: internals.authenticate };
};

internals.authCredentials = (user) => ({ id: user.id, role: user.role });

internals.jwtToken = (authData) => `Bearer ${jwtUtil.sign(internals.authCredentials(authData))}`;

internals.authenticate = (request, reply) => {
  const onSuccess = (authData) => {
    if (!authData || typeof authData !== 'object') {
      return reply(Boom.badImplementation(i18n.__('auth.jwt.badImplementation')));
    }

    db.models
      .User
      .findOne({
        where: { id: authData.id },
        attributes: ['email', 'id', 'confirmedAt', 'failedAttempts', 'lockedAt', 'role', 'accessLevel'],
        include: [{
          model: db.models.Profile,
          as: 'profile',
          attributes: ['firstName', 'lastName']
        }]
      })
      .then(user => {
        if (!user) {
          return reply(Boom.unauthorized(i18n.__('auth.invalid'), 'CustomAuth'));
        }

        // Authenticated
        return reply.continue({ credentials: user.toJSON() });
      })
      .catch(err => {
        if (err) {
          return reply(Boom.internal(err));
        }
      });
  };

  const onErr = (err) => {
    reply(Boom.unauthorized(err));
  };

  const req = request.raw.req;
  const authorization = req.headers.authorization;

  if (authorization) {
    internals
      .jwtAuth
      .authenticate(request)
      .then(onSuccess)
      .catch(onErr);
  } else {
    const authData = request.yar.get(internals.settings.sessionKey);
    if (authData) {
      onSuccess(authData);
    } else {
      onErr(i18n.__('auth.expired'));
    }
  }
};

internals.jwtScheme = () => ({
  authenticate: (request) => new Promise((resolve, reject) => {
    const req = request.raw.req;
    const authorization = req.headers.authorization;

    if (!authorization) {
      return reject(i18n.__('auth.jwt.missing'));
    }

    const parts = authorization.split(/\s+/);

    if (parts.length !== 2) {
      return reject(i18n.__('auth.jwt.bad'));
    }

    if (parts[0].toLowerCase() !== 'bearer') {
      return reject(i18n.__('auth.jwt.invalid'));
    }

    if (parts[1].split('.').length !== 3) {
      return reject(i18n.__('auth.jwt.bad'));
    }

    const token = parts[1];
    jwtUtil
      .verify(token)
      .then(resolve)
      .catch(err => {
        if (err && err.message === 'jwt expired') {
          return reject(i18n.__('auth.jwt.expired'));
        }

        if (err) {
          return resolve(i18n.__('auth.jwt.invalid'));
        }
      });
  })
});
