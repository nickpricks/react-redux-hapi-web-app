import React, { PropTypes } from 'react';
import { Button } from 'react-toolbox/lib';

// (props, context)
const UiButton = ({ ...props }) => {
  const busy = props.busy;
  const children = props.children;
  delete props.busy;
  delete props.children;

  return (
    <Button {...props}>
      {children}
      {busy && <i className="fa fa-spin fa-spinner" style={{ marginLeft: '5px' }} />}
    </Button>
  );
};

UiButton.propTypes = {
  label: PropTypes.string,
  busy: PropTypes.bool,
  children: PropTypes.object,
};

export default UiButton;
