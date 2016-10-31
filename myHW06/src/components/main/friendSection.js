require('./main.css')

import React from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import FriendViews from './friendView.js'
//renders the set of Friend components
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
      				<FriendViews/>
      			</div>
      		</div>
			)
	}
}
//renders the add friend part
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
export {AddFriend, FriendSection}