import { push } from 'react-router-redux';
import { update as updateAuthUser, getUserHomeUrl } from 'redux/modules/auth';


const EMAIL_AVAILABLE = 'account/EMAIL_AVAILABLE';
const EMAIL_AVAILABLE_SUCCESS = 'account/EMAIL_AVAILABLE_SUCCESS';
const EMAIL_AVAILABLE_FAIL = 'account/EMAIL_AVAILABLE_FAIL';

const EMAIL_CONFIRM = 'account/EMAIL_CONFIRM';
const EMAIL_CONFIRM_SUCCESS = 'account/EMAIL_CONFIRM_SUCCESS';
const EMAIL_CONFIRM_FAIL = 'account/EMAIL_CONFIRM_FAIL';

const PASSWORD_FORGOT = 'account/PASSWORD_FORGOT';
const PASSWORD_FORGOT_SUCCESS = 'account/PASSWORD_FORGOT_SUCCESS';
const PASSWORD_FORGOT_FAIL = 'account/PASSWORD_FORGOT_FAIL';

const LOAD_PASSWORD_TOKEN = 'account/LOAD_PASSWORD_TOKEN';
const LOAD_PASSWORD_TOKEN_SUCCESS = 'account/LOAD_PASSWORD_TOKEN_SUCCESS';
const LOAD_PASSWORD_TOKEN_FAIL = 'account/LOAD_PASSWORD_TOKEN_FAIL';

const PASSWORD_RESET = 'account/PASSWORD_RESET';
const PASSWORD_RESET_SUCCESS = 'account/PASSWORD_RESET_SUCCESS';
const PASSWORD_RESET_FAIL = 'account/PASSWORD_RESET_FAIL';

const initialState = {
  err: null,
  busy: false,
  resetError: null,
  pwdTokenErr: null,
  pwdTokenUserInfo: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case EMAIL_AVAILABLE:
      return { ...state, busy: true };
    case EMAIL_AVAILABLE_SUCCESS:
      return { ...state, busy: false, err: null };
    case EMAIL_AVAILABLE_FAIL:
      return { ...state, busy: false, err: action.error };

    case EMAIL_CONFIRM:
      return { ...state, busy: true };
    case EMAIL_CONFIRM_SUCCESS:
      return { ...state, busy: false, err: null, confirmedEmail: action.result.email };
    case EMAIL_CONFIRM_FAIL:
      return { ...state, busy: false, err: action.error.message || action.error, };

    case PASSWORD_FORGOT:
      return { ...state, busy: true };
    case PASSWORD_FORGOT_SUCCESS:
      return { ...state, busy: false };
    case PASSWORD_FORGOT_FAIL:
      return { ...state, busy: false };

    case LOAD_PASSWORD_TOKEN:
      return { ...state, busy: true };
    case LOAD_PASSWORD_TOKEN_SUCCESS:
      return { ...state, busy: false, pwdTokenUserInfo: action.result, pwdTokenErr: null };
    case LOAD_PASSWORD_TOKEN_FAIL:
      return { ...state, busy: false, pwdTokenUserInfo: null, pwdTokenErr: action.error.message };

    case PASSWORD_RESET:
      return { ...state, busy: true, resetError: null };
    case PASSWORD_RESET_SUCCESS:
      return { ...state, busy: false, resetError: null };
    case PASSWORD_RESET_FAIL:
      return { ...state, busy: false, resetError: action.error };

    default:
      return state;
  }
}

export function checkEmailAvailable(email) {
  return {
    types: [EMAIL_AVAILABLE, EMAIL_AVAILABLE_SUCCESS, EMAIL_AVAILABLE_FAIL],
    promise: (client) => client.post('/accounts/email-availability', { data: { email } }),
  };
}

export function emailConfirmation(token) {
  return {
    types: [EMAIL_CONFIRM, EMAIL_CONFIRM_SUCCESS, EMAIL_CONFIRM_FAIL],
    promise: (client) => client.post(`/accounts/email-confirmation/${token}`),
  };
}

/**
 * sends the password reset email
 * @param email
 */
export const passwordForgot = email => {
  const data = { email };
  return {
    types: [PASSWORD_FORGOT, PASSWORD_FORGOT_SUCCESS, PASSWORD_FORGOT_FAIL],
    promise: api => api.post('/accounts/password-forgot', { data }),
  };
};

/**
 * check and validate token for password reset
 * @param token
 */
export const validateToken = token => {
  const data = { token };
  console.log('==== validate token');
  return {
    types: [LOAD_PASSWORD_TOKEN, LOAD_PASSWORD_TOKEN_SUCCESS, LOAD_PASSWORD_TOKEN_FAIL],
    promise: api => api.post('/accounts/validatePasswordToken', { data }),
  };
};

/**
 * updates new password in db
 * @param data
 */
export const passwordUpdate = data => {
  console.log('==== update', data);
  return (dispatch, getState, api) => new Promise((resolve, reject) => {
    dispatch({ type: PASSWORD_RESET });
    api
      .post('/accounts/password-reset', { data })
      .then((result) => {
        dispatch({ type: PASSWORD_RESET_SUCCESS, result });
        dispatch(updateAuthUser(result));
        dispatch(push(getUserHomeUrl(result)));
        resolve({});
      })
      .catch(error => {
        dispatch({ type: PASSWORD_RESET_FAIL, error });
        reject(error);
      });
  });
};
