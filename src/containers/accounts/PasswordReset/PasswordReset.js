import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { asyncConnect } from 'redux-async-connect';

import { UiButton as Button } from 'components/ui';
import { reduxForm as form, Field } from 'redux-form';
import { TextField } from 'components/fields';
import { createValidator, required, maxLength, match, email } from 'utils/validation';

import { passwordUpdate, validateToken } from 'redux/modules/account';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => new Promise((resolve, reject) => {
    const query = getState().routing.locationBeforeTransitions.query;

    dispatch(validateToken(query.token))
      .then(resolve)
      .catch(err => {
        console.log(err);
        reject(err || err.message);
      });
  })
}])
@connect(state => ({
  busy: state.account.busy,
  resetError: state.account.resetError,
  pwdTokenErr: state.account.pwdTokenErr,
  initialValues: state.account.pwdTokenUserInfo,
}))
@form({
  form: 'passwordReset',
  validate: createValidator({
    email: [required, email],
    password: [required, maxLength(50)],
    confirmPassword: [required, maxLength(50), match('password')],
  })
})
export default class PasswordReset extends Component {
  static propTypes = {
    busy: PropTypes.bool,
    resetError: PropTypes.string,
    pwdTokenErr: PropTypes.string,
    handleSubmit: PropTypes.func,
  };

  state = { notify: null };

  updatePassword = (formData, dispatch) => new Promise((resolve, reject) => {
    dispatch(passwordUpdate({
      email: formData.email,
      password: formData.password,
    }))
    .then((res) => {
      this.state.notify = res;
      setTimeout(() => { dispatch(push('/signIn')); }, 500);
      resolve();
    })
    .catch(reject);
  });

  render() {
    const { handleSubmit, busy, resetError } = this.props;

    return (
      <div className="form_bg">
        <div className="container mt80 text-center">
          <Helmet title="Reset Password" />
          <div className="col-xs-offset-1 col-xs-11 col-md-offset-2 col-md-9 mt100">
            <h1>Reset Your Password</h1>
            <div className="row">
              <div className="col-md-9 col-md-offset-2 col-sm-12 col-sm-offset-2 col-xs-12">
                <div className="bg_black">
                  <h3>Please enter your email</h3>
                  <form className="col-xs-12 text-left" onSubmit={handleSubmit(this.updatePassword)}>
                    <Field
                      name="email"
                      label="Username"
                      component={TextField}
                      placeholder="Username"
                      type="email" disabled
                    />
                    <Field
                      name="password"
                      label="Password"
                      component={TextField}
                      placeholder="Password"
                      type="password"
                    />
                    <Field
                      name="confirmPassword"
                      label="Confirm Password"
                      component={TextField}
                      placeholder="Confirm Password"
                      type="password"
                    />
                    {this.state.notify &&
                      <span className="mt-10 mb-20 success" style={{ display: 'inline-block' }}>
                        {this.state.notify}
                      </span>
                    }
                    {resetError &&
                      <span className="mt-10 mb-20 error" style={{ display: 'inline-block' }}>{resetError}</span>
                    }
                    <div className="row end-xs">
                      <div className="col-xs-12 text-center">
                        <Button
                          className="btn-submit"
                          raised
                          label="Save"
                          type="submit"
                          disabled={busy}
                          busy={busy}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

