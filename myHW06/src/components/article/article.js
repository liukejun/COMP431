require('../main/main.css')

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import { connect } from 'react-redux'
import Comments from './comments.js'
import { addComments } from '../../action.js'
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
			const { id, author, img, date, text, comments, isShow, avatar, user, updateComment } = this.props 
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
			let newComment, newpost
			const _updateComment = () => {
				console.log(newComment)
				var articleId = id
				var commentAuthor = user
				var currentdate = new Date(); 
				var datetime = currentdate.getFullYear()+"-"+(currentdate.getMonth()+1)+"-"+currentdate.getDate()
				var commentId = currentdate.getTime()
				updateComment(articleId, commentAuthor, commentId, datetime, newComment)
			}
			//decide if the article should be shown
			if (isShow == true){
				return (
					<Row className="row well-white">
					    <Col className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
					    	<p id="article_author" className="post_user_style">{ author }</p>
					    	{
					    		avatar == null ? null : 
					    		<img src={avatar}   width='90px' height='90px' />
					    	}
		           			
					    </Col>
					    <Col className="col-xs-12 col-sm-9 col-md-9 col-lg-9 text-left">
					    	<span className="timeStamp">posted on {date}</span>
		            		<p id="article_text">{ text }</p>
					    </Col>
					    <Row>
					    	{
					    		img == null ? null : 
					    		<img src={img}   alt="Avatar" />
					    	}
					    </Row>
					    <Row>
							<Col className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
						    	<button className="btn-fix-width-blue" onClick={showMakeComment}>Comment</button>
			            	</Col>
			            	<Col className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
			            		<button className="btn-fix-width-green" disabled={editAuth()} onClick={showEdit}>Edit</button>
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
											<textarea className="changepost" defaultValue={text}></textarea>
										</Col>
									</Row>
									<Row>
										<button className="btn-fix-width-green">Submit changes</button>
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
    id: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    img: PropTypes.string,
    date: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,  
    comments: PropTypes.array,
    isShow: PropTypes.bool.isRequired,
    avatar: PropTypes.string.isRequired,
    user: PropTypes.string,
    updateComment: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
            updateComment: (articleId, commentAuthor, commentId, datetime, newComment) => {
            	dispatch(addComments(articleId, commentAuthor, commentId, datetime, newComment))
            }
        }
}
export default connect((state) => ({
	null, 
	mapDispatchToProps
}))(Article)
