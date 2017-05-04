import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { TextField, DatePicker } from 'components/fields';
import { connect } from 'react-redux';
import { normalizePhone } from 'utils/normalize';

const maxDate = new Date();
const GeneralDetail = ({ states }) => (
  <div>
    <div className="col-md-3 col-sm-3 col-xs-12" >
      <Field name="firstName" label="FirstName" component={TextField} placeholder="First Name" type="text" />
    </div>
    <div className="col-md-3 col-sm-3 col-xs-12" >
      <Field name="middleName" label="MiddleName" component={TextField} placeholder="Middle Name" type="text" />
    </div>
    <div className="col-md-3 col-sm-3 col-xs-12" >
      <Field name="lastName" label="LastName" component={TextField} placeholder="Last Name" type="text" />
    </div>
    <div className="col-md-3 col-sm-3 col-xs-12" >
      <label>Date of Birth</label>
      <Field
        name="dateOfBirth" placeholder="Date of Birth" autoOk
        type="text" className="dateOfBirthDialog" maxDate={maxDate} component={DatePicker}
        inputFormat={(value) => `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`}
      />
    </div>
    <div className="clearfix"></div>
    <div className="col-md-9 col-sm-9 col-xs-12" >
      <Field name="address" label="Address" component={TextField} placeholder="Address" type="text" />
    </div>
    <div className="col-md-3 col-sm-3 col-xs-12" >
      <Field
        name="homePhone" label="HomePhone" component={TextField}
        placeholder="Home Phone" type="text" normalize={normalizePhone}
      />
    </div>
    <div className="clearfix"></div>
    <div className="col-md-3 col-sm-3 col-xs-12" >
      <Field name="city" label="City" component={TextField} placeholder="City" type="text" />
    </div>
    <div className="col-md-6 col-sm-6 col-xs-12" >
      <label>State</label>
      <Field name="state" component="select" >
        <option>Select State</option>
        {
          states.map(i => (
            <option key={i.value} value={i.name} >{i.name}</option>
          ))
        }
      </Field>
    </div>
    <div className="col-md-3 col-sm-3 col-xs-12" >
      <Field name="zipCode" label="ZipCode" component={TextField} placeholder="Zip Code" type="text" />
    </div>
    <div className="clearfix"></div>
    <div className="col-md-3 col-sm-3 col-xs-12" >
      <Field
        name="cellPhone" label="CellPhone" component={TextField} placeholder="Cell Phone"
        type="text" normalize={normalizePhone}
      />
    </div>
    <div className="col-md-3 col-sm-3 col-xs-12" >
      <Field name="email" label="Email" component={TextField} autoComplete="off" placeholder="Email" type="email" />
    </div>
    <div className="col-md-3 col-sm-3 col-xs-12" >
      <Field
        name="password" label="Password" component={TextField} autoComplete="off" placeholder="Password" type="password"
      />
    </div>
    <div className="col-md-3 col-sm-3 col-xs-12" >
      <Field
        name="confirmPassword" label="ConfirmPassword" component={TextField} autoComplete="off"
        placeholder="Confirm Password" type="password"
      />
    </div>
  </div>
);

GeneralDetail.propTypes = {
  states: PropTypes.array
};

const mapState = (state) => ({
  states: state.registration.states,
});

export default connect(mapState)(GeneralDetail);
