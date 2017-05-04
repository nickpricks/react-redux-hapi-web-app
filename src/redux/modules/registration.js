import { push } from 'react-router-redux';
import { states } from 'redux/local/constants';
import { update as updateAuthUser } from 'redux/modules/auth';

const REGISTER = 'registration/REGISTER';
const REGISTER_SUCCESS = 'registration/REGISTER_SUCCESS';
const REGISTER_FAIL = 'registration/REGISTER_FAIL';

const LOAD_TEACHER_BY_TOKEN = 'registration/LOAD_TEACHER_BY_TOKEN';
const LOAD_TEACHER_BY_TOKEN_SUCCESS = 'registration/LOAD_TEACHER_BY_TOKEN_SUCCESS';
const LOAD_TEACHER_BY_TOKEN_FAIL = 'registration/LOAD_TEACHER_BY_TOKEN_FAIL';

const LOAD_PARTICIPANTS_REGISTRATION_BY_TOKEN = 'registration/LOAD_PARTICIPANTS_REGISTRATION_BY_TOKEN';
const LOAD_PARTICIPANTS_REGISTRATION_BY_TOKEN_SUCCESS = 'registration/LOAD_PARTICIPANTS_REGISTRATION_BY_TOKEN_SUCCESS';
const LOAD_PARTICIPANTS_REGISTRATION_BY_TOKEN_FAIL = 'registration/LOAD_PARTICIPANTS_REGISTRATION_BY_TOKEN_FAIL';

const REGISTER_GUARDIAN = 'registration/REGISTER_GUARDIAN';
const REGISTER_GUARDIAN_SUCCESS = 'registration/REGISTER_GUARDIAN_SUCCESS';
const REGISTER_GUARDIAN_FAIL = 'registration/REGISTER_GUARDIAN_FAIL';

const REGISTER_PARTICIPANT = 'registration/REGISTER_PARTICIPANT';
const REGISTER_PARTICIPANT_SUCCESS = 'registration/REGISTER_PARTICIPANT_SUCCESS';
const REGISTER_PARTICIPANT_FAIL = 'registration/REGISTER_PARTICIPANT_FAIL';


const initialState = {
  loading: false,
  error: null,
  teacherInfo: {},
  hasVisionInsurance: true,
  hasMedicalInsurance: true,
  states
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REGISTER:
      return { ...state, loading: true };
    case REGISTER_SUCCESS:
      return { ...state, loading: false, loaded: true };
    case REGISTER_FAIL:
      return { ...state, loading: false, loaded: false, error: action.error };

    case LOAD_TEACHER_BY_TOKEN:
      return { ...state, loading: true };
    case LOAD_TEACHER_BY_TOKEN_SUCCESS:
      return { ...state, loading: false, teacherInfo: action.result || {} };
    case LOAD_TEACHER_BY_TOKEN_FAIL:
      return { ...state, loading: false, error: action.error };

    case LOAD_PARTICIPANTS_REGISTRATION_BY_TOKEN:
      return { ...state, loading: true };
    case LOAD_PARTICIPANTS_REGISTRATION_BY_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        participantsDetails: action.result.participantDetails,
        teacherInfo: action.result.teacherInfo
      };
    case LOAD_PARTICIPANTS_REGISTRATION_BY_TOKEN_FAIL:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
}

export function getTeacherByToken(token) {
  return (dispatch, getState, api) => new Promise((resolve, reject) => {
    dispatch({ type: LOAD_TEACHER_BY_TOKEN });
    api
      .get(`teacherInfo/by/${token}`)
      .then((result) => {
        dispatch({ type: LOAD_TEACHER_BY_TOKEN_SUCCESS, result });
        resolve({});
      })
      .catch(err => {
        dispatch({ type: LOAD_TEACHER_BY_TOKEN_FAIL, error: err });
        dispatch(push('/signIn'));
        reject(err);
      });
  });
}

export function getTeacherGuardianInfoByToken(token) {
  return (dispatch, getState, api) => new Promise((resolve, reject) => {
    dispatch({ type: LOAD_PARTICIPANTS_REGISTRATION_BY_TOKEN });
    api
      .get(`teacherGuardianInfo/by/${token}`)
      .then((data) => {
        dispatch({
          type: LOAD_PARTICIPANTS_REGISTRATION_BY_TOKEN_SUCCESS,
          result: {
            participantDetails: {
              firstName: data.firstName,
              middleName: data.middleName,
              lastName: data.lastName,
              email: data.email,
              todaysDate: new Date(new Date().toDateString()).toString(),
            },
            teacherInfo: {
              teacherName: data.teacherName,
              guardianName: data.guardianName,
              teacherLocations: data.teacherLocations,
            }
          }
        });
        resolve({});
      })
      .catch(error => {
        dispatch({ type: LOAD_PARTICIPANTS_REGISTRATION_BY_TOKEN_FAIL, error });
        dispatch(push('/signIn'));
        reject(error);
      });
  });
}

export function register(data) {
  const token = data.token;

  delete data.status;
  delete data.confirmPassword;
  delete data.token;

  return (dispatch, getState, api) => new Promise((resolve, reject) => {
    dispatch({ type: REGISTER });
    api
      .post(`/registration/teacher/${token}`, { data })
      .then((result) => {
        dispatch(updateAuthUser(result));
        dispatch({ type: REGISTER_SUCCESS });
        dispatch(push('/teacher/Dashboard'));
        resolve({});
      })
      .catch(error => {
        dispatch({ type: REGISTER_FAIL }, error);
        reject(error);
      });
  });
}

export function registerGuardian(data) {
  return (dispatch, getState, api) => new Promise((resolve, reject) => {
    dispatch({ type: REGISTER_GUARDIAN });
    api
      .post('/registration/guardian', { data })
      .then((result) => {
        dispatch(updateAuthUser(result));
        dispatch({ type: REGISTER_GUARDIAN_SUCCESS });
        dispatch(push('/guardian/dashboard'));
        resolve({});
      })
      .catch(error => {
        dispatch({ type: REGISTER_GUARDIAN_FAIL }, error);
        reject(error);
      });
  });
}

export function registerParticipant(token, data) {
  return (dispatch, getState, api) => new Promise((resolve, reject) => {
    dispatch({ type: REGISTER_PARTICIPANT });
    api
      .post(`/registration/participant/${token}`, { data })
      .then((result) => {
        dispatch({ type: REGISTER_PARTICIPANT_SUCCESS, result });
        dispatch(updateAuthUser(result));
        dispatch(push('/participant/dashboard'));
        resolve({});
      })
      .catch(error => {
        dispatch({ type: REGISTER_PARTICIPANT_FAIL, error });
        reject(error);
      });
  });
}

export const quickRegisterParticipant = (data) => {
  global.console.log(data);
  return (dispatch, getState, api) => new Promise((resolve, reject) => {
    dispatch({ type: REGISTER_PARTICIPANT });
    api
      .post('/registration/brief/participant', { data })
      .then((result) => {
        dispatch({ type: REGISTER_PARTICIPANT_SUCCESS, result });
        dispatch(push('/signIn'));
        resolve({});
      })
      .catch(error => {
        dispatch({ type: REGISTER_PARTICIPANT_FAIL, error });
        reject(error);
      });
  });
};
