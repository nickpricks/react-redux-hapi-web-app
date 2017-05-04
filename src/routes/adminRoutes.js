

module.exports = (routeHelpers) => ({
  path: 'admin',

  childRoutes: [
    {
      path: 'dashboard',
      getComponent(location, cb) {
        return __CLIENT__ ?
          require.ensure([], (require) => cb(null, require('../containers/admin/Dashboard'))) :
          cb(null, require('../containers/admin/Dashboard'));
      },
      onEnter: routeHelpers.requireLogin
    },
  ]
});
