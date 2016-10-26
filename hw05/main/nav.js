require('./main.css')
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import {Nav, NavHeader, Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {navigatePages} from '../action.js';
import {getStore} from '../app.js'
import { connect } from 'react-redux'
import { logout } from './mainActions.js'
//renders the nav bar in main page
class NavContent extends React.Component {
	
	render() {
		const { toMain, toProfile, toLanding } = this.props
		return (
			<Navbar inverse className="navbar navbar-default">
			    <Navbar.Header>
			      <Navbar.Brand>
			        <a href="#">Rice Book</a>
			      </Navbar.Brand>
			      <Navbar.Toggle />
			    </Navbar.Header>
			    <Navbar.Collapse>
			      <Nav>
			        <NavItem eventKey={1} onClick={toMain}>Home</NavItem>
			        <NavItem eventKey={2} onClick={toProfile}>Profile</NavItem>
			        <NavDropdown eventKey={3} title="Friend" id="basic-nav-dropdown">
			          <MenuItem eventKey={3.1}>Action</MenuItem>
			          <MenuItem eventKey={3.2}>Another action</MenuItem>
			          <MenuItem eventKey={3.3}>Something else here</MenuItem>
			          <MenuItem divider />
			          <MenuItem eventKey={3.3}>Separated link</MenuItem>
			        </NavDropdown>
			      </Nav>
			      <Nav pullRight>
			        <NavItem eventKey={1} href="#"><span className="glyphicon glyphicon-user"></span> My Account</NavItem>
			        <NavItem eventKey={2} onClick={toLanding}>Log Out</NavItem>
			      </Nav>
			    </Navbar.Collapse>
			  </Navbar>
			)
	}
}
NavContent.propTypes = {
    toMain: PropTypes.func.isRequired,
    toProfile: PropTypes.func.isRequired,
    toLanding: PropTypes.func.isRequired
}
const Navs = connect(null, dispatch => ({
    toMain: () => dispatch(navigatePages('Main_Page')),
    toProfile: () => dispatch(navigatePages('Profile_Page')),
    toLanding: () => {
    	dispatch(logout())
	}
  }))(NavContent);
export default Navs;