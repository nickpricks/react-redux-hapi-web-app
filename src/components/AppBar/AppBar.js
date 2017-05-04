import React, { Component, PropTypes } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { UiButton as Button } from '../../components/ui';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';
import { push } from 'react-router-redux';
import { logout } from '../../redux/modules/auth';

@connect(state => ({
  user: state.auth.user,
  loggingOut: state.auth.loggingOut,
}))
export default class AppBar extends Component {
  static propTypes = {
    user: PropTypes.object,
    loggingOut: PropTypes.bool,
    dispatch: PropTypes.func,
  };

  static contextTypes = {
    store: PropTypes.object
  };

  handleSignOut = () => {
    const { store: { dispatch } } = this.context;
    dispatch(logout());
  };

  handleNavClick = (path) => {
    const { dispatch } = this.props;
    dispatch(push(path));
  };

  render() {
    const { user, loggingOut } = this.props;
    return (
      <header className="main-header">
        <div className="row" >
          <div className="col-xs-12 header-top text-right" >
            {!user && (
              <Link to="/signIn" >
                <Button inverse label="Sign In" />
                <Button inverse label="Sign Up" />
              </Link>
            )}
            {user && (
              <ul className="list-unstyled list-inline" >
                <li style={{ color: 'white' }}>
                  {`${user.profile.firstName} ${user.profile.lastName}`}
                </li>
                <li>
                  <Button
                    icon="power_settings_new" label="Sign Out" inverse onClick={this.handleSignOut}
                    busy={loggingOut}
                  />
                </li>
              </ul>
            )}
          </div>
        </div>
        <Navbar collapseOnSelect >
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/" className="site_logo" />
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} href="/" onClick={() => { this.handleNavClick('/'); }}>Home</NavItem>
              <NavItem eventKey={2} href="/about" onClick={() => { this.handleNavClick('/about'); }}>About</NavItem>
              <NavItem eventKey={3} onClick={() => { this.handleNavClick('/services'); }}>Services</NavItem>
              <NavItem eventKey={4} onClick={() => { this.handleNavClick('/solutions'); }}>Solutions</NavItem>
              <NavItem eventKey={5} onClick={() => { this.handleNavClick('/findClinic'); }}>Find a Clinic</NavItem>
              <NavItem eventKey={6} onClick={() => { this.handleNavClick('/contactUs'); }}>Contact Us</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}
