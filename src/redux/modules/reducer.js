import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';

import { reducer as form } from 'redux-form';
import account from './account';
import app from './app';
import auth from './auth';
import registration from './registration';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  form,
  account,
  app,
  auth,
  registration
});
