import React, { PropTypes } from 'react';
import { AppBar } from '../../components';
import { connect } from 'react-redux';


const PublicLayout = ({ children, isAsync }) => {
  const showProgress = isAsync;
  return (
    <div style={{ height: '100%', width: '100%', float: 'left' }}>
      <AppBar />
      {children}
      <p> {showProgress}</p>
    </div>
  );
};

PublicLayout.propTypes = {
  children: PropTypes.object,
  isAsync: PropTypes.bool,
};

const connectState = state => ({
  isAsync: !state.reduxAsyncConnect.loaded,
});

export default connect(connectState)(PublicLayout);

