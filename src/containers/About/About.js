import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class About extends Component {
  render() {
    return (
      <div className="row">
        <Helmet title="About Us" />
        <div className="col-xs-offset-1 col-xs-11 col-md-offset-2 col-md-9 mt170">
          <h1>About Us</h1>
          <p>About Us Content</p>
        </div>
      </div>
    );
  }
}
