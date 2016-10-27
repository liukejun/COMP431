require('../main/main.css')

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Image} from 'react-bootstrap';
//Comments component which renders the comment content of each article
class Comments extends React.Component {
	
	render() {
		const { id, commentId, author, date, text } = this.props
		return (
			<Row className="row comment-style">
			    <Col className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
			    	<p id="article_author">{ author }</p>	
			    </Col>
			    <Col className="col-xs-12 col-sm-12 col-md-9 col-lg-9 text-left">
			    	<span className="timeStamp">commented on {date}</span>
            		<p id="article_text">{ text }</p>
			    </Col>
			</Row>
		);
	};
}
Comments.propTypes = {
    id: PropTypes.number,
    commentId: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    text: PropTypes.string
}
export default Comments;