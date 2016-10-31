require('./main.css')

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import {updateHeadline} from './mainActions.js'
import { connect } from 'react-redux'
// renders update headline in current user section
class UpdateHeadline extends React.Component {
	render() {
		let newheadline;
      	const {update} = this.props
      	const _update = () => {
        	update(newheadline.value)
      	} 
		return (
			<div>
				<Col className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
					<input type="text" className="inputText_fixedWidth" name="mystatus" ref={ (node) => newheadline = node }  placeholder="What's new today?"/>
				</Col>
				<Col className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
					<button className="btn-update-in-profile" onClick={_update}>Update</button>
				</Col>
			</div>
		)
	}
}
UpdateHeadline.propTypes = {
	update: PropTypes.func.isRequired
}

const UpdateHeadlines = connect(null, dispatch => ({
    update: (headline) => {
      dispatch(updateHeadline(headline))
    }
  }))(UpdateHeadline);
export default UpdateHeadlines;