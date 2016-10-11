require('../main/main.css')

import React from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Image} from 'react-bootstrap';

class SearchArticle extends React.Component {
	render() {
		return (
			<div className="row well-white">
			    <form role="search">
			    <div className="form-group input-group">
			      <input type="text" className="form-control" placeholder="Search.."/>
			      <span className="input-group-btn">
			        <button className="btn btn-default" type="button">
			          <span className="glyphicon glyphicon-search"></span>
			        </button>
			      </span>
			    </div>
			  </form>
			  </div>
			);
	};
}
export default SearchArticle;