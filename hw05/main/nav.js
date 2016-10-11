require('./main.css')
import React from 'react';
import ReactDOM from 'react-dom';
import {Nav, NavHeader, Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
class NavContent extends React.Component {
	updateNavToMain() {
		var val = "Main_Page";
		this.props.update(val);
	}
	updateNavToLanding() {
		var val = "Landing_Page";
		this.props.update(val);
	}
	updateNavToProfile() {
		var val = "Profile_Page";
		this.props.update(val);
	}
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
			        <NavItem eventKey={1} onClick={this.updateNavToMain.bind(this)}>Home</NavItem>
			        <NavItem eventKey={2} onClick={this.updateNavToProfile.bind(this)}>Profile</NavItem>
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
			        <NavItem eventKey={2} onClick={this.updateNavToLanding.bind(this)}>Log Out</NavItem>
			      </Nav>
			    </Navbar.Collapse>
			  </Navbar>
			)
	}
}
NavContent.propTypes = {
      update: React.PropTypes.func.isRequired,
  };
export default NavContent;