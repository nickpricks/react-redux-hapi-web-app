import { push } from 'react-router-redux';
import { roles } from '../../../config/default';


const LOAD = 'auth/LOAD';
const LOAD_SUCCESS = 'auth/LOAD_SUCCESS';
const LOAD_FAIL = 'auth/LOAD_FAIL';

const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'auth/LOGIN_FAIL';

const LOGOUT = 'auth/LOGOUT';
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'auth/LOGOUT_FAIL';

const UPDATE_USER = 'auth/UPDATE_USER';

const initialState = {
  loading: false,
  loaded: false,
  loggingIn: false,
  loggingOut: false,
  user: null,
  error: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return { ...state, loading: true };
    case LOAD_SUCCESS:
      return { ...state, loading: false, loaded: true, user: action.result };
    case LOAD_FAIL:
      return { ...state, loading: false, loaded: false, error: action.error };

    case LOGIN:
      return { ...state, loggingIn: true };
    case LOGIN_SUCCESS:
      return { ...state, loggingIn: false, user: action.result };
    case LOGIN_FAIL:
      return { ...state, loggingIn: false, user: null, error: action.error };

    case LOGOUT:
      return { ...state, loggingOut: true };
    case LOGOUT_SUCCESS:
      return { ...state, loggingOut: false, user: null };
    case LOGOUT_FAIL:
      return { ...state, loggingOut: false, logoutError: action.error };

    case UPDATE_USER:
      return { ...state, user: action.result };

    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export const getUserHomeUrl = (user) => {
  let homeUrl = '';
  switch (user.role) {
    case roles.ADMIN:
      homeUrl = '/admin/dashboard';
      break;
    case roles.USER:
      homeUrl = '/admin/dashboard';
      break;
    default:
      global.console.warn(`Redux::Module:getUserHomeUrl role => ${user.role} has no home url defined`);
      homeUrl = '/';
      break;
  }
  return homeUrl;
};

export function load() {
  return (dispatch, getState, api) => new Promise((resolve, reject) => {
    if (getState().auth.user) {
      return resolve();
    }

    dispatch({ type: LOAD });
    api
      .get('/sessions')
      .then(result => {
        dispatch({ type: LOAD_SUCCESS, result });
        resolve();
      })
      .catch(error => {
        dispatch({ type: LOAD_FAIL, error });
        reject(error);
      });
  });
}

export function login(email, password) {
  return (dispatch, getState, api) => new Promise((resolve, reject) => {
    dispatch({ type: LOGIN });
    api
      .post('/sessions', { data: { username: email, password } })
      .then(({ user }) => {
        dispatch({ type: LOGIN_SUCCESS, result: user });

        const homeUrl = getUserHomeUrl(user);
        dispatch(push(homeUrl));
        resolve(user);
      })
      .catch(error => {
        dispatch({ type: LOGIN_FAIL, error });
        reject(error);
      });
  });
}

export function logout() {
  return (dispatch, getState, api) => {
    dispatch({ type: LOGOUT });
    api
      .del('/sessions')
      .then(() => {
        dispatch({ type: LOGOUT_SUCCESS });
        dispatch(push('/'));
      })
      .catch(error => {
        console.log(error, error);
        dispatch({ type: LOGOUT_FAIL, error });
      });
  };
}

export const update = (data) => {
  return {
    type: UPDATE_USER,
    result: data,
  };
};
