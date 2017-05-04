import React, { PropTypes } from 'react';
import { Input } from 'react-toolbox/lib';

const TextFieldMU = ({ input, label, meta: { touched, error }, ...custom }) => (
  <Input label={label} error={touched && error ? error : ''} {...input} {...custom} autoComplete="off" />
);

TextFieldMU.propTypes = {
  label: PropTypes.string,
  meta: PropTypes.object,
  input: PropTypes.object,
  custom: PropTypes.object
};

export default TextFieldMU;
