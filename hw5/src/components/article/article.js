require('../main/main.css')

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import Comments from './comments.js'
// Article component for rendering individual article
export class Article extends React.Component{
	constructor(props) {
    	super(props)
    	//decide whether the comments would be shown
    	this.hideComments = true
  	}
	render() {
			const { id, author, img, date, text, comments, isShow, avatar } = this.props 
			// change the comments shown state
			const showComments = () => {
				this.hideComments = !this.hideComments
				this.forceUpdate()
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
						    	<button className="btn-fix-width-blue">Comment</button>
			            	</Col>
			            	<Col className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
			            		<button className="btn-fix-width-green">Edit</button>
			            	</Col>
			            	<Col className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
			            		<button className="btn-fix-width-yellow" onClick={showComments}>ShowComments ({comments.length})</button>
			            	</Col>
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
    avatar: PropTypes.string.isRequired
}
