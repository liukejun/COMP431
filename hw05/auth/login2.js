require('./login.css')
require('react-bootstrap')

import React from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Image} from 'react-bootstrap';

class Login extends React.Component {
	render() {
		return (
			<div>
				<h3>Log In</h3>
				<div className="form-group">
					<input type="text" name="username" id="username" className="form-control" placeholder="Account Name" value=""/>
				</div>
				<div className="form-group">
					<input type="password" name="password" id="password_login" className="form-control" placeholder="Password"/>
				</div>
				<div className="form-group">
					<div className="row">
						<div className="col-sm-6 col-sm-offset-3">
							<input type="submit" name="login-submit" id="login-submit" className="form-control btn btn-login" value="Log In" onClick="return validateLogin()"/>
						</div>
					</div>
				</div>
			</div>
			);
	}
}

export default Login;