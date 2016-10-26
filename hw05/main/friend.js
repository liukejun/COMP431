require('./main.css')

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Image} from 'react-bootstrap';
//Friend component which renders the individual friend
export class Friend extends React.Component {
	render() {
		const { id, headline, avatar } = this.props 
		return (
			<div>
				<Row className="show-grid">
					<Col className=" col-xs-5 col-md-5 col-ms-5 col-lg-5">
						<Image className="photo-in-friend" src={avatar} alt="Avatar" responsive/>
					</Col>
					<Col className="col-md-7 col-ms-7 col-xs-7">
						<p className="username-in-friend"><a href="#">{id}</a></p>
					</Col>
				</Row>
				<Row className="show-grid status-in-profile-friend text-left">
					<p ><span className="glyphicon glyphicon-heart"></span> {headline}</p>
				</Row>
				<Row className="text-right">
					<button type="button" className="btn btn-grey btn-sm">
	              		<span className="glyphicon glyphicon-remove"></span> Unfollow
	            	</button>
				</Row>
			</div>
			)
	}
}
Friend.propTypes = {
    id: PropTypes.string,
    headline: PropTypes.string,
    avatar: PropTypes.string
}