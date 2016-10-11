require('./login.css');

import React from 'react';
import ReactDOM from 'react-dom';
import {Nav, NavHeader, Navbar, NavItem, NavDropdown, MenuItem, Tooltip} from 'react-bootstrap';
import {Grid, Row, Col, Image} from 'react-bootstrap';

import {validateLoginName, validateLoginPassword} from './landinglogic.js';
import { login } from '../dummy.js'
class Login extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        showNameTip: false,
        showPwdTip:false
      }
    }
    updateNav() {
      var nm=this.refs.username.value;
      var pwd=this.refs.password.value;
      if (validateLoginName(nm) && validateLoginPassword(pwd)){
        var res = login().then(function(result){
          console.log(result);
        });
        //console.log(res);
        var val = "Main_Page";
        this.props.update(val);
      } else {
          if (!validateLoginName(nm)){
            this.setState({showNameTip:true});
          }
          if (!validateLoginPassword(pwd)){
            this.setState({showPwdTip:true});
          }
          if (validateLoginName(nm))
            this.setState({showNameTip:false});
          if (validateLoginPassword(pwd))
            this.setState({showPwdTip:false});
      }
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
                      <input type="text" className="form-control" id="loginUsername" ref="username" placeholder="Username"/>
                      {
                      !this.state.showNameTip ? null :
                      <Tooltip placement="bottom" className="in" id="tooltip-bottom">
                        Please input correct username.
                      </Tooltip>
                    }
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" id="loginPwd" ref="password" placeholder="Password"/>
                    {
                      !this.state.showPwdTip ? null :
                      <Tooltip placement="bottom" className="in" id="tooltip-bottom">
                        Please input correct password.
                      </Tooltip>
                    }
                    
                  </div>
                  <button type="submit" className="btn btn-primary" id="loginActionBtn" onClick={this.updateNav.bind(this)}>Sign In</button>
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