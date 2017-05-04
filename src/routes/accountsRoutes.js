

module.exports = () => ({
  path: 'accounts',

  childRoutes: [
    {
      path: 'emailConfirmation',
      getComponent(location, cb) {
        return __CLIENT__ ?
          require.ensure([], (require) => cb(null, require('../containers/accounts/EmailConfirmation'))) :
          cb(null, require('../containers/accounts/EmailConfirmation'));
      }
    },

    {
      path: 'forgot-password',
      getComponent(location, cb) {
        return __CLIENT__ ?
          require.ensure([], (require) => cb(null, require('../containers/accounts/PasswordForgot'))) :
          cb(null, require('../containers/accounts/PasswordForgot'));
      }
    },


    {
      path: 'reset-password',
      getComponent(location, cb) {
        return __CLIENT__ ?
          require.ensure([], (require) => cb(null, require('../containers/accounts/PasswordReset'))) :
          cb(null, require('../containers/accounts/PasswordReset'));
      }
    },

  ]
});
