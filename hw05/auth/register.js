require('./login.css')
require('react-bootstrap')

import React from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Image} from 'react-bootstrap';

class Register extends React.Component {
	constructor(props) {
      super(props);
    }
	
	render() {
		return (
			<div>
				<h2>Sign Up</h2>
				<div className="form-group">
					<input type="text" placeholder="Account Name" name="aname" required id="accountname" className="form-control" value=""/>
				</div>
				<div className="form-group">
					<input type="text" placeholder="Display Name" name="dname" id="displayname" className="form-control" value=""/>
				</div>
				<div className="form-group">
					<input type="email" placeholder="Email Address" name="email" required id="email" className="form-control" value=""/>
				</div>
				<div className="form-group">
					<input type="number" placeholder="Phone Number" name="phone" required id="phone" className="form-control" value=""/>
				</div>
				<div className="form-group">
					<input type="date" id="birth" name="birthday" required  className="form-control" value=""/>
				</div>
				<div className="form-group">
					<input type="number" placeholder="Zip Code" name="zip" required id="zipcode" className="form-control" value=""/>
				</div>
				<div className="form-group">
					<input type="password" placeholder="Password" name="pwd" required id="password" className="form-control"/>
				</div>
				<div className="form-group">
					<input type="password" placeholder="Confirm Password" name="pwdcmf" required id="confirm-password" className="form-control"/>
				</div>
				<div className="form-group">
					<Row>
						<Col className="col-sm-6 col-sm-offset-3">
							<input type="submit" name="register-submit" id="register-submit" className="form-control btn btn-register" value="Sign Up" />
						</Col>
					</Row>
				</div>
			</div>
			);
	}
}

export default Register;