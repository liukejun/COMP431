require('./main.css')

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import {Friend} from './friend.js'
import { connect } from 'react-redux'

class FriendView extends React.Component {
	render() {
		const { friendItems } = this.props
		return (
			<div>
				{friendItems.map(({id, headline, avatar}) => (
	                <Friend key={id} id={id} headline={headline} avatar={avatar} />
	            ))} 
            </div>
			)
	}
}

FriendView.propTypes = {
	friendItems: PropTypes.arrayOf(PropTypes.shape({
        ...Friend.propTypes
    }).isRequired).isRequired
}
const mapStateToProps = (state) => {
	return {
		friendItems: state.friends.friends
	}
}
const FriendViews = connect(
	mapStateToProps,
	null
)(FriendView);

export default FriendViews;