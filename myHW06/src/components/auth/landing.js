require('./login.css')
require('react-bootstrap')

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import LogIn from './login.js'
import Register from './register.js'
import Cover from './cover.js'
import {Footer} from '../main/main.js'
import { connect } from 'react-redux'
//Landing component which renders the architecture of the landing page
class Landing extends React.Component {

	render() {
		const { errorMsg, successMsg } = this.props
		return (
			<div>
				<LogIn />
				<p className="errorDisplay">{ successMsg != '' ? successMsg:errorMsg }</p>
				<Grid>
					<Row>
						<Col className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
							<Cover/>
						</Col>
						<Col className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
							<Register/>
						</Col>
					</Row>
				</Grid>
				<Footer/>
			</div>
			);
	}
	
}
Landing.propTypes = {
	errorMsg: React.PropTypes.string,
	successMsg: React.PropTypes.string
}
const mapStateToProps = (state) => {
	return {
		errorMsg: state.updateError.error,
		successMsg: state.updateSuccess.success
	}
}
const Landings = connect(
	mapStateToProps,
	null
)(Landing);
export default Landings;