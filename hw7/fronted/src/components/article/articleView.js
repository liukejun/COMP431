require('../main/main.css')

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import { connect } from 'react-redux'
import  Article  from './article.js'

// ArticleView component which renders a set of Articles
//sort the articles according to their date and then map it to Article component
export class ArticleView extends React.Component {
	render() {
		const { articleItems, user } = this.props
		return (
			<div>
				<ul id="main_articles_parent">

					{articleItems.sort(function(a,b){
                		return new Date(a.date) > new Date(b.date)? -1 : 1
            			}).map(({id, author, img, date, text, comments, isShow, avatar}) => (
                		<Article key={id} id={id} author={author} img={img} date={date} text={text} comments={comments} isShow={isShow} avatar = {avatar} user={user}/>), user)
        			}
	            </ul>
	        </div>
		)
	}
	
}
ArticleView.propTypes = {
	articleItems: PropTypes.arrayOf(PropTypes.shape({
        ...Article.propTypes
    }).isRequired).isRequired,
    user: PropTypes.string
}
const mapStateToProps = (state) => {
	return {
		articleItems: state.articles.article,
		user: state.userInfo.username
	}
}
const ArticleViews = connect(
	mapStateToProps,
	null
)(ArticleView);

export default ArticleViews;