import React, { PropTypes } from 'react';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import { emailConfirmation } from 'redux/modules/account';
import Login from 'components/SignIn';
import Helmet from 'react-helmet';

const EmailConfirmation = ({ err, confirmedEmail }) => (
  <div className="row">
    <Helmet title="Email Confirmation" />
    <div className="col-xs-offset-1 col-md-offset-3">
      {
        err ? <div>
          <h2>Email Confirmation Failed</h2>
          <p style={{ color: 'red' }}>
            {err}
          </p>
        </div> : <div>
          <h2>Email Confirmation Succeeded</h2>
          <p>Please Login To Proceed</p>
          <Login email={confirmedEmail} />
        </div>
      }
    </div>
  </div>

);

EmailConfirmation.propTypes = {
  err: PropTypes.string,
  confirmedEmail: PropTypes.string,
};

export default connect(state => ({
  err: state.account.err,
  confirmedEmail: state.account.confirmedEmail,
}))(asyncConnect([
  {
    promise: ({ store: { dispatch, getState } }) => {
      const promises = [];
      const routing = getState().routing;
      if (routing.locationBeforeTransitions) {
        const query = routing.locationBeforeTransitions.query;
        promises.push(dispatch(emailConfirmation(query.token)));
      }
      return Promise.all(promises);
    }
  }
])(EmailConfirmation));
