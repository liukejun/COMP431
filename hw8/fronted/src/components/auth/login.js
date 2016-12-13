require('./login.css');
import {navigatePages} from '../../action.js'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import {Nav, NavHeader, Navbar, NavItem, NavDropdown, MenuItem, Tooltip} from 'react-bootstrap';
import {Grid, Row, Col, Image} from 'react-bootstrap';

import {validateLoginName, validateLoginPassword} from './landinglogic.js';
import {localLogin } from './authActions.js'
import { facebookLogin } from './authActions.js'
//Login component which renders the sign in part of the nav bar
export class Login extends React.Component{
    render() {
      let newUserName;
      let newPwd;
      const {login, loginFB} = this.props
      const _login = () => {
        login(newUserName.value, newPwd.value)
      } 
      const _loginFB = () => {
        loginFB()
      }
      return (
        <Navbar inverse className="navbar navbar-default">
          <Navbar.Header>
            <Navbar.Brand>
              <a className="title" id ="landing_title">Rice Book</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} href="#" className="navbar-form navbar-right">
                  <div className="form-group">
                      <input type="text" className="form-control" id="loginUsername" ref={ (node) => newUserName = node } placeholder="Username"/>
                      
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control" id="loginPwd" ref={ (node) => newPwd = node } placeholder="Password"/>
              
                    
                  </div>
                  <button type="submit" className="btn btn-primary" id="loginActionBtn" onClick={_login}>Sign In</button>
                  
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        )
    }
}
//<button type="submit" className="btn btn-primary" id="loginFbBtn" onClick={_loginFB}>Facebook</button>
Login.propTypes = {
    login: PropTypes.func.isRequired
}
//get the information from redux store
const LogIn = connect(null, dispatch => ({
    login: (username, password) => {
      dispatch(localLogin(username, password))
    },
    loginFB :() => {
      dispatch(facebookLogin())
    }
  }))(Login);
export default LogIn;