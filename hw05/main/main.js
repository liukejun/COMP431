require('./main.css')

import React from 'react';
import ReactDOM from 'react-dom';
import {Nav, NavHeader, Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import NavContent from './nav.js';
import UserSection from './userSection.js'
import {AddFriend, FriendSection} from './friendSection.js';
import PostSection from './post.js';
import SearchArticle from '../article/searchArticle.js'
import Article from '../article/article.js'
class Main extends React.Component {
	update(val) {
		this.props.updateState(val);
	}
	render() {
		return (
			<div>
				<NavContent update={this.update.bind(this)} onChange={this.update}/>
				<MainContent />
				<Footer />
			</div>
			)
	}
	test(){
		console.log("1");
	}
}


class MainContent extends React.Component {
	render() {
		return (
			<Grid className="text-center">
				<Row>
					<MainLeft/>
					<MainCenter/>
  				</Row>
  			</Grid>
			)
	}
}
class MainLeft extends React.Component {
	render() {
		return (
			<div>
				<Col className="col-xs-12 col-sm-12 col-md-4 col-lg-4 well-white">
					<UserSection />
					<FriendSection/>
					<AddFriend/>
				</Col>
			</div>
			)
	}
}
class MainCenter extends React.Component {
	render() {
		return (
			<div>

				<Col className="col-xs-12 col-sm-12 col-md-8 col-lg-8 well-white">
					<PostSection/>
				</Col>
				<Col className="col-xs-12 col-sm-12 col-md-8 col-lg-8 well-white">
					<SearchArticle/>
				</Col>
				<Col className="col-xs-12 col-sm-12 col-md-8 col-lg-8 well-white">
					<Article/>
				</Col>
			</div>
			)
	}
}

class Footer extends React.Component {
	render() {
		return (
			<footer className="footer-with-color text-center">
				<p className="footer-word">2016, Kejun Liu. Version 1.1</p>
			</footer>
			)
	}
}
Main.propTypes = {
  		updateState: React.PropTypes.func.isRequired,
	};
export default Main;
export {Footer};