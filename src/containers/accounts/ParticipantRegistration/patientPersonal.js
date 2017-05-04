import React from 'react';
import { TextField } from 'components/fields';
import { Field } from 'redux-form';

const PatientPersonal = () => (
  <div>
    <div className="row">
      <div className="col-md-3 col-sm-3 col-xs-12">
        <Field name="firstName" component={TextField} placeholder="First Name" type="text" />
      </div>
      <div className="col-md-3 col-sm-3 col-xs-12">
        <Field name="middleName" component={TextField} placeholder="Middle Name" type="text" />
      </div>
      <div className="col-md-3 col-sm-3 col-xs-12">
        <Field name="lastName" component={TextField} placeholder="Last Name" type="text" />
      </div>
      <div className="pull-right col-md-3 col-sm-3 col-xs-12">
        <Field name="todaysDate" component={TextField} title="Today's Date" type="text" disabled />
      </div>
    </div>
    <div className="row">
      <div className="col-md-3 col-sm-3 col-xs-12">
        <Field
          name="email" component={TextField} autoComplete="off" placeholder="Email" type="email"
        />
      </div>
      <div className="col-md-3 col-sm-3 col-xs-12">
        <Field
          name="password" component={TextField} autoComplete="off" placeholder="Password" type="password"
        />
      </div>
      <div className="col-md-3 col-sm-3 col-xs-12">
        <Field
          name="confirmPassword" component={TextField} autoComplete="off"
          placeholder="Confirm Password" type="password"
        />
      </div>
    </div>
  </div>
);

export default PatientPersonal;
