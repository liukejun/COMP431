require('./login.css')
require('react-bootstrap')

import React from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Image} from 'react-bootstrap';

class Cover extends React.Component {
	render() {
		return (
			<div className="cover-style">
				<center><h3>Find your Book Friend and </h3>
				<h3>share with the world.</h3>
				<h4 className="cover-h4"><span className="glyphicon glyphicon-book"></span> Post your thoughts</h4>
				<h4 className="cover-h4"><span className="glyphicon glyphicon-globe"></span> View Friends' Posts</h4>
				<h4 className="cover-h4"><span className="glyphicon glyphicon-pencil"></span> Comment on what interests you</h4>
				</center>
			</div>
			);
	}
}

export default Cover;