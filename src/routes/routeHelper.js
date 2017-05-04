import { getUserHomeUrl } from 'redux/modules/auth';
import { push } from 'react-router-redux';
import { roles } from '../../config/default';

const internals = {};

export default (store) => {
  internals.store = store;

  return {
    requireLogin: internals.requireLogin,

    tryUserHome: internals.tryUserHome,

    loadRouteErr: (err) => {
      console.error('Dynamic page loading failed', err);
    },

    loadRoute: (cb) => {
      console.log('*in ', module, cb);
      return (module) => cb(null, module.default || module);
    }
  };
};

internals.checkAuth = () => new Promise((resolve) => {
  const store = internals.store;
  const { auth: { user } } = store.getState();
  resolve(user);
});

internals.adminOnly = (nextState, replace, cb) => {
  internals.checkAuth()
    .then(user => {
      if (roles.includes(user.role)) {
        const homeUrl = getUserHomeUrl(internals.store.getState().auth.user);
        internals.store.dispatch(push(homeUrl));
      } else {
        replace('/');
      }
      cb();
    });
};

internals.requireLogin = (nextState, replace, cb) => {
  internals.checkAuth()
    .then(user => {
      if (!user) {
        // oops,
        console.info('Routes::requireLogin::not logged in, so can\'t be here!');
        replace('/');
      }
      cb();
    });
};

internals.tryUserHome = (nextState, replace, cb) => {
  internals.checkAuth()
    .then(user => {
      if (user) {
        const homeUrl = getUserHomeUrl(internals.store.getState().auth.user);
        if (homeUrl) {
          console.info(`Routes::checkAuth role => ${user.role}`);
          internals.store.dispatch(push(homeUrl));
        } else {
          console.info(`No home url => ${user.role}`);
        }
      }
      cb();
    });
};
