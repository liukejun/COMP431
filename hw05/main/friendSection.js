require('./main.css')

import React from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Image} from 'react-bootstrap';

class FriendSection extends React.Component {
	render() {
		return (
			<div>
				<div className="friends">
	        		<p className="title-in-section">
	        			<span className="glyphicon glyphicon-user">
	        			</span>  Friends
	        		</p>
	      		</div>
	      		<div className="well-white">
      				<FriendContent/>
      			</div>
      		</div>
			)
	}
}
class FriendContent extends React.Component {
	render() {
		return (
			<div>
				<Row className="show-grid">
					<Col className=" col-xs-5 col-md-5 col-ms-5 col-lg-5">
						<Image className="photo-in-friend" src="../images/friend1.JPG" alt="Avatar" responsive/>
					</Col>
					<Col className="col-md-7 col-ms-7 col-xs-7">
						<p className="username-in-friend"><a href="#">Chris</a></p>
              			<p className="location-shortview"><span className="glyphicon glyphicon-home"></span> Texas, USA</p>
					</Col>
				</Row>
				<Row className="show-grid status-in-profile-friend text-left">
					<p ><span className="glyphicon glyphicon-heart"></span> Great day at Rice Football Game!</p>
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
class AddFriend extends React.Component {
	render() {
		return (
			<div>
				<Row>
					<Col className="col-md-9">
						<input className="inputText_fixedWidth" type="text" name="findFriend" id="findFriend" value="" placeholder="Find new friend"/>
					</Col>
					<Col className="col-md-3">
						<span><button className="btn-update-in-profile">Add</button></span>
					</Col>
				</Row>
			</div>
			)
	}
}

export {AddFriend, FriendSection};