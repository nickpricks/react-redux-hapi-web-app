import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { UiButton as Button } from 'components/ui';
import { reduxForm as form, Field } from 'redux-form';
import { TextField } from 'components/fields';
import { createValidator, required, email } from 'utils/validation';

import { passwordForgot } from 'redux/modules/account';

@connect(state => ({ busy: state.account.busy }))
@form({
  form: 'passwordForgot',
  validate: createValidator({
    email: [required, email]
  })
})
export default class PasswordForgot extends Component {
  static propTypes = {
    busy: PropTypes.bool,
    handleSubmit: PropTypes.func,
  };

  state = { notify: null };

  getNewPassword = (formData, dispatch) => new Promise((resolve, reject) => {
    dispatch(passwordForgot(formData.email))
      .then(() => {
        this.state.notify = 'Successfully sent password reset email. You will be redirected to login!';
        setTimeout(() => {
          dispatch(push('/signIn'));
        }, 2500);
        resolve();
      })
      .catch(reject);
  });

  render() {
    const { handleSubmit, busy } = this.props;

    return (
      <div className="form_bg">
        <div className="container mt80 text-center">
          <Helmet title="Lost Password" />
          <div className="col-xs-offset-1 col-xs-11 col-md-offset-2 col-md-9 mt100">
            <h1>Lost Your Password</h1>
            <div className="row">
              <div className="col-md-9 col-md-offset-2 col-sm-12 col-sm-offset-2 col-xs-12">
                <div className="bg_black">
                  <h3>Please enter your email</h3>
                  <form className="col-xs-12 text-left" onSubmit={handleSubmit(this.getNewPassword)}>
                    <Field name="email" label="Username" component={TextField} placeholder="Username" type="email" />
                    <span
                      className="mt-10 mb-20 success"
                      style={{ display: 'inline-block' }}
                    >{this.state.notify}</span>
                    <div className="row end-xs">
                      <div className="col-xs-12 text-center">
                        <p>* We will send you a link (that will be valid for next 24 Hours)
                        to reset your password.</p>
                        <Button
                          className="btn-submit"
                          raised
                          label="Reset my password"
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

