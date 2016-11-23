require('./main.css')
var FileInput = require('react-file-input');

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import { addArticles } from '../../action.js'
import { connect } from 'react-redux'
import { postArticle, postTexts } from './mainActions.js' 

// renders post new article 
export class PostSection extends React.Component {
	
	render() {
		let newImg, text, reader, ifImg
		let fd = new FormData()
		const clearPost = () => {
			text.value = ''
		}
		const { postImg, postTxt, user } = this.props
		
		const _post = () => {
			console.log('_postTxt:')
			if (ifImg == 1) {
				postImg(fd);
				ifImg = 0
			} else {
				console.log(text.value)
				postTxt(text.value)
			}
			
		}
		function handleImageChange(e){
			newImg = e.target.files[0]
			ifImg = 1
			fd.append('text', text.value)
			fd.append('image', newImg)
			console.log('handleImageChange:')
			console.log(fd)
			console.log('Selected file:', newImg);
		}
		
		return (
			<div>
				<Row>
					<Col className="col-md-5 well-white well-image-post text-center">
						<label className="btn btn-update-in-profile btn-file">
              				<span className="glyphicon glyphicon-plus"></span>
               					 Add Image 
               				<form>
						        <FileInput name="myImage"
						                   accept=".png,.gif,.jpeg,.jpg"
						                   ref={ (node) => newImg = node }
						                   placeholder="My Image"
						                   disabled = {true}
						                   onChange={(e) => handleImageChange(e)} />
						    </form>
            			</label>
					</Col>
					<Col className="col-md-7 well-white well-image-post">
						<textarea id="postContent" ref={ (node) => text = node } className="inputpost" defaultValue="Your post here..."></textarea>
					</Col>
				</Row>
				<Row>
					<Col className="col-md-6">
						<button className="btn-cancel" onClick={clearPost}>Cancel</button>
					</Col>
					<Col className="col-md-6">
						<button className="btn-post" id="main_post" onClick={_post}>Post</button>
					</Col>			
				</Row>
      		</div>
			);
	};
}
PostSection.propTypes = {
	postImg: PropTypes.func.isRequired,
	postTxt: PropTypes.func.isRequired,
	user : PropTypes.string.isRequired
}
const mapStateToProps = (state) => {
	return {
		user: state.userInfo.username
	}
}
const PostSections = connect(mapStateToProps, dispatch => ({
    postImg: (fd) => {
    	dispatch(postArticle(fd))
	},
	postTxt: (text) => {
		dispatch(postTexts(text))
	}

}))(PostSection);
export default PostSections;