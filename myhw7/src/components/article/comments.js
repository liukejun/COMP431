require('../main/main.css')
require('../main/main.css')
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import { connect } from 'react-redux'
import { editComment } from './articleAction.js'
//Comments component which renders the comment content of each article
class Comments extends React.Component {
	constructor(props) {
    	super(props)
    	//decide whether the edit comments would be shown
    	this.hideMakeComment = true
  	}
	render() {
		let newComment
		const { id, commentId, author, date, text, user, updateComment } = this.props
		const editComment = () => {
			this.hideMakeComment = false
			this.forceUpdate()
			console.log("start to edit")
		}
		const _updateComment = () => {
			var articleId = id
			updateComment(articleId, newComment.value, commentId)
			this.hideMakeComment = true
			this.forceUpdate()
			console.log("update comment")
		}
		return (
			<Row className="row comment-style">
			    <Col className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
			    	<p id="article_author">{ author }</p>	
			    </Col>
			    <Col className="col-xs-12 col-sm-12 col-md-7 col-lg-7 text-left">
			    	<span className="timeStamp">commented on {date}</span>
			    	{
			    		this.hideMakeComment ? <p id="article_text">{ text }</p> :
			    		<textarea  defaultValue = { text } ref={ (node) => newComment = node }></textarea>
			    	}
            		
			    </Col>
			    {
			    	user != author ? null:
			    	<Col className="col-xs-12 col-sm-12 col-md-2 col-lg-2">
				    	<button className="editComment" onClick={editComment}>Edit</button>
				    	{
				    		this.hideMakeComment ? null :
				    		<button className="editComment" onClick={_updateComment}>Submit</button>
				    	}
				    </Col>
			    }
			    
			</Row>
		);
	};
}
Comments.propTypes = {
    id: PropTypes.any,
    commentId: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    text: PropTypes.string,
    user: PropTypes.string,
    updateComment:PropTypes.func.isRequired
}
const mapStateToProps = (state) => {
	return {
		user: state.userInfo.username
	}
}
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
            updateComment: (articleId, newComment, commentId) => {
            	dispatch(editComment(articleId, newComment, commentId))
            }
        }
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Comments)