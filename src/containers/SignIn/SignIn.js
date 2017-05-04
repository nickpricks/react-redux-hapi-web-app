import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import SignInForm from '../../components/SignIn';

@connect(state => ({ user: state.auth.user }))

export default class SignIn extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  };

  render() {
    const { user } = this.props;
    return (
      <div className="form_bg">
        <div className="container mt80 text-center">
          <Helmet title="Sign In" />
          <h1>Welcome </h1>
          {!user && (
            <div className="row">
              <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-12">
                <div className="bg_black">
                  <h3>Please Sign in</h3>
                  <SignInForm />
                </div>
              </div>
            </div>
          )}

          {user && <div>
            <p>You are currently logged in as {user.email}.</p>
            <p>Please wait while we redirect you to your home page...</p>
          </div>
          }
        </div>
      </div>
    );
  }
}
