import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class ContactUs extends Component {
  render() {
    return (
      <div className="row">
        <Helmet title="ContactUs" />
        <div className="col-xs-offset-1 col-xs-11 col-md-offset-2 col-md-9 mt170">
          <h1>Contact Us</h1>
        </div>
      </div>
    );
  }
}
