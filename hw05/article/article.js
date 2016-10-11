require('../main/main.css')

import React from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Image} from 'react-bootstrap';

class Article extends React.Component {
	render() {
		return (
				<Row className="row well-white">
				    <Col className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
				    	<p>Scott</p>
	           			<img src="../images/article1.jpg"  height="90" width="90" alt="Avatar" className="img-circle"/>
				    </Col>
				    <Col className="col-xs-12 col-sm-9 col-md-7 col-lg-7 text-left">
				    	<span className="timeStamp">September 20, 2016</span>
	            		<p>On January 1, Scott said: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
	            		<a href="#" className="find-more">More>></a></p>
				    </Col>
				    <Row>
						<Col className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
					    	<button className="btn-fix-width">Comment</button>
		            	</Col>
		            	<Col className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
		            		<button className="btn-fix-width">Edit</button>
		            	</Col>
					</Row>
				</Row>
			);
	};
}
export default Article;