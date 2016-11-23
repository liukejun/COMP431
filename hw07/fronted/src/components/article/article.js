require('../main/main.css')

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import { connect } from 'react-redux'
import Comments from './comments.js'
import { addComments } from '../../action.js'
import { putComments, putArticle } from './articleAction.js'
import { formatDate } from '../auth/authActions.js'
// Article component for rendering individual article
export class Article extends React.Component{
	constructor(props) {
    	super(props)
    	//decide whether the comments would be shown
    	this.hideComments = true
    	this.hideEdit = true
    	this.hideMakeComment = true
  	}
	render() {
			const { id, author, img, date, text, comments, isShow, avatar, user, updateComment, updateArticle } = this.props 
			// change the comments shown state
			const showComments = () => {
				this.hideComments = !this.hideComments
				this.forceUpdate()
			}
			// change the eidt shown state
			const showEdit = () => {
				this.hideEdit = !this.hideEdit
				this.forceUpdate()
			}
			// change the make comment shown state
			const showMakeComment = () => {
				this.hideMakeComment = !this.hideMakeComment
				this.forceUpdate()
			}
			// decide whether the user has the authority to edit the article
			const editAuth = () => {
				if (user == author)
					return false
				else
					return true
			}
			let newComment, newpost, editedArticle
			// add a new comment, update comment in server
			const _updateComment = () => {
				console.log(newComment)
				var articleId = id
				var commentAuthor = user
				var currentdate = new Date(); 
				var datetime = currentdate.getFullYear()+"-"+(currentdate.getMonth()+1)+"-"+currentdate.getDate()
				var commentId = currentdate.getTime()
				updateComment(articleId, newComment.value)
			}
			// edit article, update article text in server
			const _updateArticle = () => {
				var articleId = id
				updateArticle(articleId, editedArticle.value)
			}
			//decide if the article should be shown
			if (isShow == true){
				return (
					<Row className="row well-white">
					    <Col className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
					    	<p id="article_author" className="post_user_style">{ author }</p>
					    	{
					    		avatar == null ? null : 
					    		<img src={avatar}   width='90px'/>
					    	}
		           			
					    </Col>
					    <Col className="col-xs-12 col-sm-9 col-md-9 col-lg-9 text-left">
					    	<span className="timeStamp">posted on {formatDate(date)}</span>
		            		<p id="article_text">{ text }</p>
					    </Col>
					    <Row>
					    	{
					    		img == null ? null : 
					    		<img src={img}  width="300px" alt="Avatar" />
					    	}
					    </Row>
					    <Row>
							<Col className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
						    	<button className="btn-fix-width-blue" onClick={showMakeComment}>Comment</button>
			            	</Col>
			            	<Col className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
			            		<button className="btn-fix-width-green" id="article_edit" disabled={editAuth()} onClick={showEdit}>Edit</button>
			            	</Col>
			            	<Col className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
			            		<button className="btn-fix-width-yellow" onClick={showComments}>ShowComments ({comments.length})</button>
			            	</Col>
						</Row>
						<Row>
							{
								this.hideMakeComment ? null :
								<div className="well">
									<Row>
										<Col className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
											<textarea className="changepost" ref={ (node) => newComment = node }></textarea>
										</Col>
									</Row>
									<Row>
										<button className="btn-fix-width-blue" onClick={_updateComment}>Submit this Comment</button>
									</Row>
								</div>
							}
						</Row>
						<Row>
							{
								this.hideEdit ? null :
								<div className="well">
									<Row>
										<Col className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
											<textarea className="changepost" id='article_edit_text' defaultValue={text} ref={ (node) => editedArticle = node }></textarea>
										</Col>
									</Row>
									<Row>
										<button className="btn-fix-width-green" id="article_edit_submit" onClick={_updateArticle}>Submit changes</button>
									</Row>
								</div>
							}
						</Row>
						<Row>
							{this.hideComments ?  null :
							
								<div className="well">
									{comments.map(({id, commentId, author, date, text}) => (
					                	<Comments key={commentId} id={id} commentId={commentId} author={author} date={date} text={text}/>
					            	))}
				            	</div>
							}
							
						</Row>
					</Row>
					);
				}else {
					return null;
				}
			};
}

Article.propTypes = {
    id: PropTypes.any.isRequired,
    author: PropTypes.string.isRequired,
    img: PropTypes.string,
    date: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,  
    comments: PropTypes.array,
    isShow: PropTypes.bool.isRequired,
    avatar: PropTypes.string.isRequired,
    user: PropTypes.string,
    updateComment: PropTypes.func.isRequired,
    updateArticle: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
            updateComment: (articleId, newComment) => {
            	dispatch(putComments(articleId, newComment))
            },
            updateArticle: (articleId, editedArticle) => {
            	dispatch(putArticle(articleId, editedArticle))
            }
        }
}
export default connect(
	null,
	mapDispatchToProps
)(Article)
