require('./main.css')
import React from 'react';
import ReactDOM from 'react-dom';
import {Nav, NavHeader, Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
class NavContent extends React.Component {
	render() {
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
			        <NavItem eventKey={1} href="#">Home</NavItem>
			        <NavItem eventKey={2} href="#">Profile</NavItem>
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
			        <NavItem eventKey={2} href="#">Log Out</NavItem>
			      </Nav>
			    </Navbar.Collapse>
			  </Navbar>
			)
	}
}

export default NavContent;