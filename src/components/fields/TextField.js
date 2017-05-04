import React, { PropTypes } from 'react';

const TextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <div className={`form-group ${touched && error ? 'has-error' : ''}`}>
    <label>{label}</label>
    <input {...input} {...custom} autoComplete="off" className={`form-control ${input.className}`} />
    <span className="help-block">{touched && error ? error : ''}</span>
  </div>
);

TextField.propTypes = {
  label: PropTypes.string,
  meta: PropTypes.object,
  input: PropTypes.object,
  custom: PropTypes.object
};

export default TextField;
