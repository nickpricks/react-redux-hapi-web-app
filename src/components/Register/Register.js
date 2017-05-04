import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { UiButton as Button } from 'components/ui';
import { reduxForm as form, Field, SubmissionError } from 'redux-form';
import { TextField } from 'components/fields';
import { createValidator, required, email, match } from 'utils/validation';
import { register } from 'redux/modules/registration';

@form({
  form: 'Register',
  validate: createValidator({
    firstName: [required],
    lastName: [required],
    email: [required, email],
    password: [required],
    confirmPassword: [required, match('password')],
  })
})

@connect(state => ({ submitting: state.registration.submitting }))

export default class Register extends Component {
  static propTypes = {
    error: PropTypes.string,
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
    reset: PropTypes.func,
  };
  registration = (formData, dispatch) => new Promise((resolve, reject) => {
    const { reset } = this.props;
    dispatch(register(formData))
      .then(() => reset())
      .catch(err => reject(new SubmissionError({ _error: err.message || err })));
  });
  render() {
    const { handleSubmit, error, submitting } = this.props;
    return (
      <form className="col-xs-12" onSubmit={handleSubmit(this.registration)} >
        <Field name="firstName" component={TextField} label="First Name" type="text" icon="person" />
        <Field name="lastName" component={TextField} label="Last Name" type="text" icon="person" />
        <Field name="email" component={TextField} label="Email" type="email" icon="email" />
        <Field name="password" component={TextField} label="Password" type="password" icon="lock" />
        <Field name="confirmPassword" component={TextField} label="Confirm Password" type="password" icon="lock" />
        <br />
        <span className="mt10 mb20 error" style={{ display: 'inline-block' }}> {error}</span>
        <div className="row end-xs" >
          <div className="col-xs" >
            <Button label="Submit" raised primary type="submit" disabled={submitting} />
          </div>
        </div>
      </form>
    );
  }
}
