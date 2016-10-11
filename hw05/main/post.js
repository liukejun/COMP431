require('./main.css')

import React from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Image} from 'react-bootstrap';

class PostSection extends React.Component {
	render() {
		return (
			<div>
				<Row>
					<Col className="col-md-5 well-white well-image-post text-center">
						<label className="btn btn-update-in-profile btn-file">
              				<span className="glyphicon glyphicon-plus"></span>
               					 Add Image 
               				<input type="file" className="hidden"/>
            			</label>
					</Col>
					<Col className="col-md-7 well-white well-image-post">
						<textarea id="postContent" name="inputPost" className="inputpost" defaultValue="Your post here..."></textarea>
					</Col>
				</Row>
				<Row>
					<Col className="col-md-6">
						<button className="btn-cancel" onClick="clearPost()">Cancel</button>
					</Col>
					<Col className="col-md-6">
						<button className="btn-post">Post</button>
					</Col>			
				</Row>
      		</div>
			);
	};
}
export default PostSection;