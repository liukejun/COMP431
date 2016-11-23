require('./profile.css')
require('react-bootstrap')

import React from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col} from 'react-bootstrap';
import NavContent from '../main/nav.js';
import CurrentInfos from './currentInfo.js';
import UpdateInfos from './updateInfo.js';
import Backgrounds from './background.js'
// renders the architecture UI of profile page
class Profile extends React.Component {
	render() {
		return (
			<div>
				<NavContent/>
				<Backgrounds/>
				<Grid>
					<Row className="show-grid">
						<Col className="col-xs-offset-1 col-xs-10 col-sm-offset-1 col-sm-10 col-md-offset-1 col-md-10 col-lg-4 col-lg-offset-1 well-transparent">
							<CurrentInfos/>
						</Col>
						<Col className="col-xs-offset-1 col-xs-10 col-sm-offset-1 col-sm-10 col-md-offset-1 col-md-10 col-lg-offset-1 col-lg-6 well-transparent">
							<UpdateInfos/>
						</Col>
					</Row>
				</Grid>
			</div>
			)
	}
}
export default Profile;