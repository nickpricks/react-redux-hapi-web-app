const joi = require('joi');
const boom = require('boom');
const config = require('config');
const uuid = require('uuid');
const i18n = require('i18n');

const mailer = require('../mailer');
const logger = require('../services/logger');
const accountService = require('../services/accountService');
const db = require('../db');

const internals = {};
const pathPrefix = '/registration';

module.exports = [
  {
    path: `${pathPrefix}`,
    method: 'POST',
    config: {
      validate: {
        payload: {
          firstName: joi.string().max(250).required(),
          lastName: joi.string().max(250).required(),
          email: joi.string().max(250).required(),
          password: joi.string().max(250).required(),
        }
      },
      handler: (request, reply) => internals.registerUser(config.roles.USER, request, reply)
    }
  }
];

internals.onError = err => {
  const errorToLog = err || err.stack;
  logger.error(errorToLog);
  return boom.badRequest(errorToLog, err);
};

internals.registerUser = (role, request, reply) => {
  const payload = request.payload;
  payload.role = role;
  const profileDetail = {
    firstName: payload.firstName,
    lastName: payload.lastName
  };


  let userInfo = {};
  accountService
    .createUser(payload, profileDetail)
    .then((usr) => {
      request.auth.session.set(usr);
      userInfo = usr;
      reply(userInfo);
    })
    .catch(e => { reply(e.errors[0].message); });
};
