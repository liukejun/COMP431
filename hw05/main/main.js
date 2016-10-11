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
	render() {
		return (
			<div>
				<NavContent />
				<MainContent />
				<Footer />
			</div>
			)
	}
	test(){
		console.log("1");
	}
}

// class MainNavBar extends React.Component {
// 	render() {
// 		return (
// 			<nav className="navbar navbar-default navbar-static-top">
// 				<div className="container-fluid">
// 					<NavHeader />
// 					<NavContent />
// 				</div>
// 			</nav>
// 			);
// 	}
// }
// class NavHeader extends React.Component {
// 	render() {
// 		return (
// 			<div className="navbar-header">
// 				<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
// 					<span className="icon-bar"></span>
// 					<span className="icon-bar"></span>
// 					<span className="icon-bar"></span>
// 					</button>
// 					<a className="navbar-brand" href="#">Rice Book</a>
// 			</div>
// 			)
// 	}
// }
// class NavContent extends React.Component {
// 	render() {
// 		return (
// 			<div className="collapse navbar-collapse" id="myNavbar">
// 				<ul className="nav navbar-nav">
// 					<li className="active"><a href="#">Home</a></li>
//         			<li><a href="#">Friends</a></li>
//         			<li><a href="#" onClick={this.test}>
//         				<span><img src="../images/photo.jpeg"  height="20" width="20" alt="Avatar" /></span>  My Profile</a>
//         			</li>
// 				</ul>

// 				<ul className="nav navbar-nav navbar-right">
// 			        <li><a href="#"><span className="glyphicon glyphicon-user"></span> My Account</a></li>
// 			        <li><a href="index.html">Log out</a></li>
// 			    </ul>
// 			</div>
// 			)
// 	}
// }


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
export default Main;
export {Footer};