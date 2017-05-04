const joi = require('joi');
const boom = require('boom');
const uuid = require('uuid');
const i18n = require('i18n');

const db = require('../db');
const accountService = require('../services/accountService');
const logger = require('../services/logger');
const mailer = require('../mailer');

const pathPrefix = '/accounts';

const internals = {};

module.exports = [
  {
    path: `${pathPrefix}/email-confirmation`,
    method: 'GET',
    config: {
      validate: {
        query: {
          email: joi.string().required(),
          token: joi.string().required(),
        },
      },
      handler: (request, reply) => {
        const User = db.models.User;
        const email = request.query.email.toLowerCase();
        const token = request.query.token;

        User
          .findOne({ where: { email } })
          .then((foundUser) => {
            const dt = (foundUser && foundUser.emailVerifyTokenAt);
            if (
              !foundUser || !foundUser.emailVerifyToken ||
              foundUser.emailVerifyToken !== token ||
              dt.setDate(dt.getDate() + 1) < new Date()  // in case link is more than a day old
            ) {
              return reply(boom.badRequest('Wrong or expired verification link'));
            }

            // Update
            foundUser.isEmailVerified = true;
            foundUser.emailVerifiedAt = new Date();
            foundUser.emailVerifyToken = null;
            foundUser.emailVerifyTokenAt = null;

            foundUser
              .save()
              .then(() => {
                reply(`Successfully verified email address ${email}`);
              })
              .catch((err) => {
                logger.error(err || err.stack);
                reply(boom.internal('Error in confirming verify token'));
              });
          })
          .catch((err) => {
            logger.error(err || err.stack);
            reply(boom.internal('Error verifying your email, please try later'));
          });
      },
    },
  },

  {
    path: `${pathPrefix}/password-forgot`,
    method: 'POST',
    config: {
      validate: {
        payload: { email: joi.string().required() }
      },
      handler: (request, reply) => {
        const email = request.payload.email.toLowerCase();
        const prettyErrMsg = 'Error while sending password reset email.';
        const successMsg = 'Successfully sent password reset email.';

        internals.fetchUser({ email }, ['email', 'id', 'role'])
          .then((foundUser) => {
            if (!foundUser) {
              logger.error(i18n.__('db.user.notExists'));
              return reply(successMsg);
            }

            internals.sendPasswordResetEmail(foundUser)
              .then(() => {
                reply(successMsg);
              })
              .catch((err) => reply(internals.onError(err, prettyErrMsg)));
          })
          .catch((err) => reply(internals.onError(err, prettyErrMsg)));
      }
    }
  },

  {
    path: `${pathPrefix}/validatePasswordToken`,
    method: 'POST',
    config: {
      validate: {
        payload: {
          token: joi.string().required(),
        }
      },
      handler: (request, reply) => {
        const payload = request.payload;
        const resetPwdToken = payload.token;
        const prettyErrMsg = 'Wrong or expired password reset link.';

        internals.fetchUser({ resetPwdToken }, ['email', 'id', 'role', 'resetPwdToken', 'resetPwdSentAt'])
          .then((foundUser) => {
            if (!foundUser) {
              logger.error(i18n.__('db.user.notExists'));
              return reply(boom.badRequest(prettyErrMsg));
            }

            const resetPwdSentDate = (foundUser && foundUser.resetPwdSentAt);
            if (
              !foundUser || !foundUser.resetPwdToken ||
              foundUser.resetPwdToken !== resetPwdToken ||
              resetPwdSentDate.setDate(resetPwdSentDate.getDate() + 1) < new Date()
            ) {
              return reply(prettyErrMsg).code(400);
            }

            return reply(foundUser);
          })
          .catch((err) => reply(internals.onError(err, prettyErrMsg)));
      }
    }
  },

  {
    path: `${pathPrefix}/password-reset`,
    method: 'POST',
    config: {
      validate: {
        payload: {
          email: joi.string().required(),
          password: joi.string().required(),
        }
      },
      handler: (request, reply) => {
        const payload = request.payload;
        const prettyErrMsg = 'Wrong or expired password reset link.';

        internals.fetchUser({ email: payload.email }, ['email', 'role', 'resetPwdToken', 'resetPwdSentAt'])
          .then((foundUser) => {
            if (!foundUser) {
              logger.error(i18n.__('db.user.notExists'));
              return reply(boom.badRequest(prettyErrMsg));
            }

            const userPayload = Object.assign({}, foundUser);
            const resetPwdSentDate = (foundUser && foundUser.resetPwdSentAt);
            if (
              !foundUser || !foundUser.resetPwdToken ||
              resetPwdSentDate.setDate(resetPwdSentDate.getDate() + 1) < new Date()
            ) {
              return reply(boom.badRequest(prettyErrMsg));
            }

            // Setting password in update payload
            userPayload.password = payload.password;
            userPayload.email = payload.email;

            internals.updatePassword(userPayload)
              .then(() => {
                internals.fetchUser({ email: payload.email }, ['email', 'role'])
                  .then(user => reply(user))
                  .catch((err) => reply(internals.onError(err, err || err.stack)));
              })
              .catch((err) => reply(internals.onError(err, err || err.stack)));
          })
          .catch((err) => reply(internals.onError(err, err || err.stack)));
      }
    }
  }
];


/**
 * on error
 * @param err
 * @param errMsg
 * */
internals.onError = (err, errMsg) => {
  logger.error(err || err.stack);
  return (boom.internal(errMsg));
};


/**
 * fetch user details from db
 * @param where
 * @param attributes
 * */
internals.fetchUser = (where, attributes) => new Promise((resolve, reject) => {
  const User = db.models.User;
  const Profile = db.models.Profile;

  User
    .findOne({
      where,
      attributes,
      include: [{ model: Profile, as: 'profile' }]
    })
    .then(data => resolve(data))
    .catch(err => reject(err));
});


/**
 * send password reset email
 * @param userInfo
 * */
internals.sendPasswordResetEmail = userInfo => new Promise((resolve, reject) => {
  userInfo.resetPwdToken = uuid.v4();
  userInfo.resetPwdSentAt = new Date();

  const emailPayload = {
    email: userInfo.email,
    name: `${userInfo.profile.firstName}\u00A0${userInfo.profile.lastName}`,
    token: userInfo.resetPwdToken
  };

  userInfo
    .save()
    .then(() => {
      mailer.passwordReset(emailPayload);
    })
    .then(resolve)
    .catch(reject);
});

/**
 * update new password in db
 * @param data
 * */
internals.updatePassword = data => new Promise((resolve, reject) => {
  accountService
    .updatePassword(data)
    .then(() => {
      // TODO MAG-61 confirmation email - NOT NOW @ben
      // mailer.passwordReset(emailPayload);
      logger.info('=== password reset email ====');
    })
    .then(resolve)
    .catch(reject);
});
