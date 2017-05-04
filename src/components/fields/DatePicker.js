import React, { PropTypes } from 'react';
import { DatePicker as Dp } from 'react-toolbox';

const DatePicker = ({ input, meta: { touched, error }, ...custom }) => (
  <Dp error={touched && error ? error : ''} {...input} {...custom} />
);

DatePicker.propTypes = {
  label: PropTypes.string,
  meta: PropTypes.object,
  input: PropTypes.object,
  custom: PropTypes.object
};

export default DatePicker;
