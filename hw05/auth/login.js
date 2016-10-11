require('./login.css');

import React from 'react';
import ReactDOM from 'react-dom';
import {Nav, NavHeader, Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {Grid, Row, Col, Image} from 'react-bootstrap';
class Login extends React.Component{
    constructor(props) {
      super(props);
    }
    updateNav() {
      var val = "Main_Page";
      this.props.update(val);
    }
     render() {
      return (
        <Navbar inverse className="navbar navbar-default">
          <Navbar.Header>
            <Navbar.Brand>
              <a className="title">Rice Book</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} href="#" className="navbar-form navbar-right">
                  <div className="form-group">
                      <input type="text" className="form-control" name="username" placeholder="Username"/>
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" name="password" placeholder="Password"/>
                  </div>
                  <button type="submit" className="btn btn-primary" onClick={this.updateNav.bind(this)}>Sign In</button>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        )
     }
}
Login.propTypes = {
      update: React.PropTypes.func.isRequired,
  };
export default Login;