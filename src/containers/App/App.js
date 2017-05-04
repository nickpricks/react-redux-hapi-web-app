import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { load as loadAuth } from '../../redux/modules/auth';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';
import { ProgressBar } from 'react-toolbox/lib';


@asyncConnect([{
  promise: ({ store: { dispatch } }) => dispatch(loadAuth())
}])
@connect(state => ({ user: state.auth.user, progress: state.app.progress }))
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object,
    user: PropTypes.object,
    progress: PropTypes.bool,
    containerHeight: PropTypes.number,
    containerWidth: PropTypes.number,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  static childContextTypes = {
    dimensions: PropTypes.shape({ containerHeight: PropTypes.number, containerWidth: PropTypes.number })
  };

  render() {
    const { progress } = this.props;
    return (
      <div style={{ height: '100%' }}>
        <Helmet {...config.app.head} />
        {progress && <ProgressBar
          type="type"
          mode="indeterminate"
        />
        }
        {this.props.children}
      </div>
    );
  }
}
