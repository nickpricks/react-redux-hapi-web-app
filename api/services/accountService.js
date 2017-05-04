const assert = require('assert');
const db = require('../db');
const crypto = require('./crypto');
const jwt = require('./jwt');
const uuid = require('uuid');
const logger = require('./logger');
const i18n = require('i18n');

const User = db.models.User;
const Profile = db.models.Profile;
const Session = db.models.Session;

/**
 * Create a user
 * @param userPayload must have following values {email, password}
 * @param profilePayload must have following values {firstName, lastName, role}
 */
exports.createUser = (userPayload, profilePayload) => new Promise((resolve, reject) => {
  assert(userPayload, i18n.__('func.missingArg', 'adminService.createUser', 'userPayload'));
  assert(userPayload.email, i18n.__('func.missingArg', 'adminService.createUser', 'userPayload.email'));
  assert(userPayload.password, i18n.__('func.missingArg', 'adminService.createUser', 'userPayload.password'));
  assert(userPayload.role, i18n.__('func.missingArg', 'adminService.createUser', 'userPayload.role'));

  assert(profilePayload, i18n.__('func.missingArg', 'adminService.createUser', 'profilePayload'));
  assert(profilePayload.firstName, i18n.__('func.missingArg', 'adminService.createUser', 'profilePayload.firstName'));
  assert(profilePayload.lastName, i18n.__('func.missingArg', 'adminService.createUser', 'profilePayload.lastName'));

  const userData = Object.assign({}, userPayload);
  delete userData.password;

  User
    .findOne({ where: { email: userData.email.toLowerCase() } })
    .then((foundUser) => {
      if (foundUser) {
        return reject(i18n.__('db.user.emailExists'));
      }

      crypto
        .genSalt()
        .then(salt => crypto.hashStringWithSalt(userPayload.password, salt))
        .then(({ hash, salt }) => {
          userData.pwd = hash;
          userData.pwdSalt = salt;
          userData.confirmationToken = uuid.v4();
          userData.confirmationSentAt = new Date();

          userData.profile = profilePayload;

          // Saved user to DB
          return User.create(userData, { include: [{ model: Profile, as: 'profile' }] });
        })
        .then(resolve)
        .catch(dbErr => {
          logger.error(dbErr);
          reject(i18n.__('db.error'));
        });
    })
    .catch(err => {
      logger.error(err);
      reject(i18n.__('db.error'));
    });
});

exports.verifyEmail = token => new Promise((resolve, reject) => {
  assert(token, i18n.__('func.missingArg', 'adminService.verifyEmail', 'token'));

  // Decode token
  jwt
    .verify(token)
    .then(decoded => {
      console.log('* decoded', decoded);
      User
        .findOne({ where: { email: decoded.email } })
        .then((foundUser) => {
          const dt = (foundUser && foundUser.confirmationSentAt);
          if (
            !foundUser || !foundUser.confirmationToken ||
            foundUser.confirmationToken !== token ||
            dt.setDate(dt.getDate() + 1) < new Date()  // in case link is more than a day old
          ) {
            return reject(i18n.__('auth.jwt.expired'));
          }

          // Update
          foundUser.confirmedAt = new Date();
          foundUser.confirmationToken = null;
          foundUser.confirmationSentAt = null;

          foundUser
            .save()
            .then(resolve)
            .catch((err) => {
              logger.error(err);
              reject(i18n.__('db.save.failed', 'User'));
            });
        })
        .catch((err) => {
          logger.error(err);
          reject(i18n.__('db.error'));
        });
    })
    .catch(ex => {
      logger.error(ex);
      reject(i18n.__('auth.jwt.expires'));
    });
});

/**
 * Authenticate a user by its username and plain password
 * @param username
 * @param password
 */
exports.authenticate = (username, password) => new Promise((resolve, reject) => {
  assert(username, i18n.__('func.missingArg', 'adminService.authenticate', 'username'));
  assert(password, i18n.__('func.missingArg', 'adminService.authenticate', 'password'));

  const invalidMsg = () => {
    reject(i18n.__('validation.invalid.usernamePwd'));
  };
  User
    .findOne({
      where: { email: username },
      attributes: ['email', 'id', 'role', 'pwd', 'pwdSalt', 'activated'],
      include: [
        { model: Profile, as: 'profile' }
      ]
    })
    .then((user) => {
      // Username invalid
      if (!user) {
        return invalidMsg();
      }

      crypto
        .hashStringWithSalt(password, user.pwdSalt)
        .then((hashData) => {
          // Password invalid
          if (user.pwd !== hashData.hash) {
            return invalidMsg();
          }

          // Sanitize user and return
          resolve(user.toJSON());
        })
        .catch(ex => {
          logger.error(ex);
          invalidMsg();
        });
    })
    .catch(err => {
      logger.error(err);
      reject(i18n.__('db.error'));
    });
});

/**
 * Create/Update user login session, it will be used to make sure that one device uses one session only
 * @param userId
 * @param device
 * @param ip
 */
exports.saveSession = (userId, device = 'default', ip) => new Promise((resolve, reject) => {
  assert(userId, i18n.__('func.missingArg', 'adminService.saveSession', 'userId'));

  // Create a session
  Session
    .findOne({ where: { userId, device } })
    .then((userSession) => {
      // update old session
      if (userSession) {
        userSession.ip = ip;
        userSession.tick = Date.now();
        return userSession.save();
      }
      // new session
      return Session.create({ id: uuid.v4(), userId, device, ip, tick: Date.now() });
    })
    .then(resolve)
    .catch(err => {
      logger.error(err);
      reject(i18n.__('db.error'));
    });
});

/**
 * Reset and update new password
 * @param resetPasswordPayload
 */
exports.updatePassword = resetPasswordPayload => new Promise((resolve, reject) => {
  assert(resetPasswordPayload, i18n.__('func.missingArg', 'adminService.updatePassword', 'resetPasswordPayload'));

  const userData = Object.assign({}, resetPasswordPayload);

  const newPassword = userData.password;

  delete userData.password;

  crypto
    .genSalt()
    .then(salt => crypto.hashStringWithSalt(newPassword, salt))
    .then(({ hash, salt }) => {
      console.log(hash, salt);
      // Update user to DB
      User
        .update({
          pwd: hash,
          pwdSalt: salt,
          confirmationSentAt: null,
          confirmationToken: null,
          resetPwdSentAt: null,
          resetPwdToken: null,
        }, { where: { email: userData.email } })
        .then(() => {
          logger.info('password updated');
          return resolve({});
        })
        .catch(reject);
    })
    .then(resolve)
    .catch(dbErr => {
      logger.error(dbErr);
      reject(dbErr);
    });
});
