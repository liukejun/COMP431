require('./profile.css')
require('react-bootstrap')

import React from 'react';
import ReactDOM from 'react-dom';

class Profile extends React.Component {
	render() {
		return (
			<Header/>
			)
	}
}

class Header extends React.Component {
	render() {
		return (
			<div >
				<center><h1>Profile Page</h1></center>
			</div>
			);
	}
}
export default Profile;