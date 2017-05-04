import React from 'react';
import Helmet from 'react-helmet';

const Home = () => (
  <div style={{ height: '100%', width: '100%', float: 'left' }}>
    <Helmet title="Home" />
    <div className="home_banner">
      <div className="container mt80">
        <div className="row">
          <div className="col-xs-12">
            <div className="banner-contant">
              <h1><span>FULLY</span> <br /><span className="text-highlight"> FOCUSED</span></h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
