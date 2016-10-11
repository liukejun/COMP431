require('./main.css')

import React from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Image} from 'react-bootstrap';

class UserSection extends React.Component {
	render() {
		return (
			<Col className="col-sm-12 col-xs-offset-3 well-white">
				<Image src="../images/photo.jpeg"  alt="Avatar" responsive/>
        		<p className="name-in-profile" id="user-info-displayName">Kejun Liu</p>
        		<p className="status-in-profile" id="userinfo-current-state">A new version of me</p>
				<UpdateState/>			
			</Col>
			)
	}
}
class UpdateState extends React.Component {
	render() {
		return (
			<div>
					<Col className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
						<input type="text" className="inputText_fixedWidth" name="mystatus" id="mystatus" value="" placeholder="What's new today?"/>
					</Col>
					<Col className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
						<button className="btn-update-in-profile" onClick="updateState()">Update</button>
					</Col>
			</div>
			)
	}
}
export default UserSection;