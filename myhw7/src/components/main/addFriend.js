require('./main.css')

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import { addFriend } from './mainActions.js'
import { connect } from 'react-redux'
import { addError } from '../../action.js'

class AddFriend extends React.Component {
	render() {
		const { addFriend, errorMsg, friends, addError } = this.props
		let id
		const _addFriend = () => {
			var num = friends.length
			console.log("friend number"+num)
			var sameId = friends.filter((e) => e.id == id.value)
			if (sameId.length == 0) {
				addFriend(id.value, num)
				addError('')
			} else {
				addError('Already following '+id.value)
			}

		}
		return (
			<div>
				<Row>
					<Col className="col-md-9">
						<input className="inputText_fixedWidth" ref={ (node) => id = node } 
						type="text" name="findFriend" id="findFriend" placeholder="Find new friend"/>
					</Col>
					<Col className="col-md-3">
						<span><button id="findFriend_btn" className="btn-update-in-profile" onClick={_addFriend}>Add</button></span>
					</Col>
				</Row>
				<p className="errorDisplay2">{ errorMsg }</p>
			</div>
			)
	}
}
AddFriend.propTypes = {
    addFriend:PropTypes.func.isRequired,
    errorMsg: React.PropTypes.string,
    friends: PropTypes.array
}
const mapStateToProps = (state) => {
	return {
		errorMsg: state.updateError.error,
		friends: state.friends.friends
	}
}
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
            addFriend: (friendId, num) => {
            	dispatch(addFriend(friendId, num))
            },
            addError: (msg) => {
            	dispatch(addError(msg))
            }
        }
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddFriend)