import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { UiButton as Button } from 'components/ui';
import { reduxForm as form, Field, SubmissionError } from 'redux-form';
import { push } from 'react-router-redux';
import { TextField } from 'components/fields';
import { createValidator, required, email } from 'utils/validation';

import { login } from 'redux/modules/auth';


@form({
  form: 'signIn',
  validate: createValidator({
    username: [required, email],
    password: [required]
  })
})

@connect(state => ({ loggingIn: state.auth.loggingIn }))

export default class SignIn extends Component {
  static propTypes = {
    error: PropTypes.string,
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
    dispatch: PropTypes.func,
    loggingIn: PropTypes.bool,
  };

  handlePasswordReset = () => {
    const { dispatch } = this.props;

    dispatch(push('/accounts/forgot-password'));
  };

  login = (formData, dispatch) => new Promise((resolve, reject) => {
    dispatch(login(formData.username, formData.password))
      .then(resolve)
      .catch(err => reject(new SubmissionError({ _error: err.message || err })));
  });

  render() {
    const { handleSubmit, error, submitting, loggingIn } = this.props;

    return (
      <form className="col-xs-12 text-left" onSubmit={handleSubmit(this.login)}>
        <Field name="username" label="Username" component={TextField} placeholder="Username" type="email" />
        <Field name="password" component={TextField} placeholder="Password" label="Password" type="password" />
        <span className="mt-10 mb-20 error" style={{ display: 'inline-block' }}> {error}</span>
        <div className="row end-xs">
          <div className="col-xs-12 text-center">
            <Button
              className="btn-submit"
              raised
              label="Submit"
              type="submit"
              disabled={submitting}
              busy={loggingIn}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <a href="#" className="pull-left txt-center">Register a New Participant</a>
            <a
              style={{ cursor: 'pointer' }}
              onClick={this.handlePasswordReset}
              className="pull-right txt-center"
            >
              Lost my Password
            </a>
          </div>
        </div>
      </form>
    );
  }
}
