import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import { UiButton as Button } from 'components/ui';
import { Field, reduxForm as form, SubmissionError } from 'redux-form';

import { getByToken } from 'redux/modules/invitation';
import { register } from 'redux/modules/registration';
import { TextField } from 'components/fields';
import { createValidator, required, email, match } from 'utils/validation';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => new Promise((resolve, reject) => {
    const query = getState().routing.locationBeforeTransitions.query;

    dispatch(getByToken(query.token))
      .then(resolve)
      .catch(reject);
  })
}])

@connect(state => ({
  initialValues: state.invitation.invite,
  readOnly: state.invitation.readOnly,
  loading: state.registration.loading,
}))

@form({
  form: 'Register Teacher',
  validate: createValidator({
    firstName: [required],
    lastName: [required],
    email: [required, email],
    password: [required],
    confirmPassword: [required, match('password')],
  })
})

export default class Registration extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    submitting: PropTypes.bool,
    readOnly: PropTypes.bool,
    error: PropTypes.string,
    handleSubmit: PropTypes.func,
    location: PropTypes.object,
  };

  registration = (formData, dispatch) => new Promise((resolve, reject) => {
    const { location } = this.props;
    const query = location.query;
    formData.token = query.token;
    dispatch(register(formData))
      .then(resolve)
      .catch(err => reject(new SubmissionError({ _error: err.message || err })));
  });

  render() {
    const { error, loading, readOnly, submitting, handleSubmit } = this.props;
    return (
      <div className="form_bg">
        {loading && <h1> LOADING </h1>}
        <div className="container mt80 text-center">
          <div className="row">
            <Helmet title="Teacher Registration" />
            <div className="col-md-offset-3 col-xs-12 col-md-6 col-sm-8 col-sm-offset-2">
              <div className="bg_black">
                <h3>Registration form</h3>
                <form className="col-xs-12" onSubmit={handleSubmit(this.registration)}>
                  <Field
                    name="firstName"
                    component={TextField}
                    placeholder="First Name"
                    type="text"
                  />
                  <Field
                    name="lastName"
                    component={TextField}
                    placeholder="Last Name"
                    type="text"
                  />
                  <Field
                    name="email"
                    component={TextField}
                    placeholder="Email"
                    type="email"
                    disabled={readOnly}
                  />
                  <Field
                    name="password"
                    component={TextField}
                    placeholder="Password"
                    type="password"
                  />
                  <Field
                    name="confirmPassword"
                    component={TextField}
                    placeholder="Confirm Password"
                    type="password"
                  />
                  <span className="mt-10 mb-20 error" style={{ display: 'inline-block' }}> {error}</span>
                  <div className="row end-xs">
                    <div className="col-xs text-center">
                      <Button
                        label="Submit"
                        className="btn-submit"
                        raised
                        primary
                        type="submit"
                        disabled={submitting}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
