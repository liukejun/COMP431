require('../main/main.css')

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import { connect } from 'react-redux'
import { filterArticle } from '../action.js'
//SearchArticle component which renders the search
//input text and click search, get article filtered
class SearchArticle extends React.Component {
	render() {
		let article;
      	const {search} = this.props
      	const _search = () => {
        	search(article.value)
      	} 
		return (
			<div className="row well-white">
			    <form role="search">
			    <div className="form-group input-group">
			      <input type="text" className="form-control" ref={ (node) => article = node } placeholder="Search.."/>
			      <span className="input-group-btn">
			        <button className="btn btn-default" type="button" onClick={_search}>
			          <span className="glyphicon glyphicon-search"></span>
			        </button>
			      </span>
			    </div>
			  </form>
			  </div>
			);
	};
}
SearchArticle.propTypes = {
	search: PropTypes.func.isRequired
}

const SearchArticles = connect(null, dispatch => ({
    search: (text) => {
    	console.log('filter article '+text)
    	dispatch(filterArticle(text))
    }
  }))(SearchArticle);
export default SearchArticles;