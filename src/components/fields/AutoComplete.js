/**
 * Created by ankitpatial on 27/08/16.
 */

import React, { PropTypes } from 'react';
import { Autocomplete as Auto } from 'react-toolbox';
const s = require('./AutoComplete.scss');

const AutoComplete = ({ input, label, meta: { touched, error }, ...custom }) => (
  <div className={s.list}>
    <Auto
      direction="down"
      label={label}
      error={touched && error ? error : ''}
      {...input} {...custom}
      autoComplete="off"
    />
  </div>
);

AutoComplete.propTypes = {
  label: PropTypes.string,
  meta: PropTypes.object,
  input: PropTypes.object,
  custom: PropTypes.object
};

export default AutoComplete;
