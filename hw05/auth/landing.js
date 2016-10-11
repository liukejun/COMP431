require('./login.css')
require('react-bootstrap')

import React from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import Login from './login.js'
import Register from './register.js'
import Cover from './cover.js'
import {Footer} from '../main/main.js'

class Landing extends React.Component {
	constructor(props) {
		super(props);
	}
	update(val) {
		this.props.updateState(val);
	}
	render() {
		return (
			<div>
				<Login  update={this.update.bind(this)} onChange={this.update}/>
				<Grid>
					<Row>
						<Col className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
							<Cover/>
						</Col>
						<Col className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
							<Register  stateProps = {this.props.stateProps}/>
						</Col>
					</Row>
				</Grid>
				<Footer/>
			</div>
			);
	}
	
}
Landing.propTypes = {
  		updateState: React.PropTypes.func.isRequired,
	};

export default Landing;