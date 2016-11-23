require('./main.css')

import React from 'react';
import ReactDOM from 'react-dom';
import {Nav, NavHeader, Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import NavContent from './nav.js';
import UserSections from './userSection.js'
import {FriendSection} from './friendSection.js';
import AddFriend from './addFriend.js'
import PostSections from './post.js';
import SearchArticle from '../article/searchArticle.js'
import ArticleViews from '../article/articleView.js'
//renders the UI architecture of main page
class Main extends React.Component {
	render() {
		return (
			<div>
				<NavContent/>
				<MainContent />
				<Footer />
			</div>
			)
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
					<UserSections />
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
					<PostSections/>
				</Col>
				<Col className="col-xs-12 col-sm-12 col-md-8 col-lg-8 well-white">
					<SearchArticle/>
				</Col>
				<Col className="col-xs-12 col-sm-12 col-md-8 col-lg-8 well-white">
					<ArticleViews/>
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
export default Main;
export {Footer};