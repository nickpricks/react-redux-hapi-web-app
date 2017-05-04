const accountService = require('../../services/accountService');
const config = require('config');
const i18n = require('i18n');
const path = require('path');
const mailer = require('../../mailer');

i18n.configure({
  directory: path.resolve(__dirname, '../../../', 'locales'),
  objectNotation: true
});

module.exports = {
  up: () => new Promise((resolve, reject) => {
    const userDetail = {
      email: 'niteshk@swiftsetup.com',
      password: 'gungun',
      role: config.roles.ADMIN
    };

    const profileDetail = {
      firstName: 'Nick',
      lastName: 'Walter'
    };


    accountService
      .createUser(userDetail, profileDetail)
      .then(mailer.userRegistration)
      .then(resolve)
      .catch(reject);
  }),

  // (queryInterface, Sequelize)
  down: () => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
