import { showProgress, hideProgress } from 'redux/modules/app';

export default function (dispatch, action, ...params) {
  return new Promise((resolve, reject) => {
    dispatch(showProgress());
    dispatch(action(...params))
      .then(res => {
        dispatch(hideProgress());
        resolve(res);
      })
      .catch(err => {
        dispatch(hideProgress());
        reject(err);
      });
  });
}
