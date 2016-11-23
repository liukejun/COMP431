require('./main.css')

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import FriendViews from './friendView.js'
import { connect } from 'react-redux'
//renders the set of Friend components
class FriendSections extends React.Component {
	render() {
		const { friendItems } = this.props
		return (
			<div>
				<div className="friends">
	        		<p className="title-in-section" >
	        			<span className="glyphicon glyphicon-user">
	        			</span>  Friends <span id="friendSection_title">{friendItems.length}</span>
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
FriendSections.propTypes = {
	friendItems:PropTypes.array
}
const mapStateToProps = (state) => {
	return {
		friendItems: state.friends.friends
	}
}
const FriendSection = connect(
	mapStateToProps,
	null
)(FriendSections);
export { FriendSection}