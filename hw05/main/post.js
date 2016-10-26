require('./main.css')

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import { postText } from '../action.js'
import { connect } from 'react-redux'
// renders post new article 
export class PostSection extends React.Component {
	render() {
		const clearPost = () => {
			this.refs.inputPost.value = ''
		}
		const { postTxt } = this.props
		return (
			<div>
				<Row>
					<Col className="col-md-5 well-white well-image-post text-center">
						<label className="btn btn-update-in-profile btn-file">
              				<span className="glyphicon glyphicon-plus"></span>
               					 Add Image 
               				<input type="file" className="hidden"/>
            			</label>
					</Col>
					<Col className="col-md-7 well-white well-image-post">
						<textarea id="postContent" ref="inputPost" className="inputpost" defaultValue="Your post here..."></textarea>
					</Col>
				</Row>
				<Row>
					<Col className="col-md-6">
						<button className="btn-cancel" onClick={clearPost}>Cancel</button>
					</Col>
					<Col className="col-md-6">
						<button className="btn-post" onClick={postTxt}>Post</button>
					</Col>			
				</Row>
      		</div>
			);
	};
}
PostSection.propTypes = {
	postTxt: PropTypes.func.isRequired
}

const PostSections = connect(null, dispatch => ({
    postTxt: () => {
    	dispatch(postText())
	}
}))(PostSection);
export default PostSections;