/**
 * Created by ankitpatial on 27/08/16.
 */

import React, { PropTypes } from 'react';
import { Checkbox as Chb } from 'react-toolbox/lib';


// (props, context)
const Checkbox = ({ input, label }) => (
  <Chb label={label} checked={!!input.value} {...input} />
);

Checkbox.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object,
};

export default Checkbox;
