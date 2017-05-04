import {
  App,
  Home,
  NotFound,
  PublicLayout,
} from '../containers';

export default (store) => {
  const routeHelpers = require('./routeHelper')(store);
  return {
    component: App,
    childRoutes: [
      {
        path: '/',
        component: PublicLayout,
        indexRoute: { component: Home, onEnter: routeHelpers.tryUserHome },
        childRoutes: [
          {
            path: 'about',
            getComponent(nextState, cb) {
              require.ensure([], (require) => cb(null, require('../containers/About')));
            },
            onEnter: routeHelpers.tryUserHome,
          },

          {
            path: 'signIn',
            getComponent(nextState, cb) {
              require.ensure([], (require) => cb(null, require('../containers/SignIn')));
            },
            onEnter: routeHelpers.tryUserHome,
          },

          {
            path: 'ContactUs',
            getComponent(nextState, cb) {
              require.ensure([], (require) => cb(null, require('../containers/ContactUs')));
            },
            onEnter: routeHelpers.tryUserHome,
          },

          {
            path: 'register',
            getComponent(location, cb) {
              return __CLIENT__ ?
                require.ensure([], (require) => cb(null, require('../containers/SignUp'))) :
                cb(null, require('../containers/SignUp'));
            }
          },

          require('./adminRoutes')(routeHelpers),

          require('./accountsRoutes')(routeHelpers),

          {
            path: '*',
            component: NotFound,
          }
        ]
      }
    ]
  };
};
