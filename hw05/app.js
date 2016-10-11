require('react-bootstrap')

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'

import Landing from './auth/landing.js';
import Main from './main/main.js';
import Profile from './profile/profile.js';
import Reducer from './reducer.js'

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			location: "Landing_Page"
		}
		
	}
	updateState(val) {
		this.setState({location: val});
	}
   	render() {
   		var displayPage;
		if (this.state.location == "Landing_Page") {
			displayPage = <Landing updateState={this.updateState.bind(this)} onChange={this.updateState}/>;
		} else if (this.state.location == "Main_Page"){
			displayPage = <Main stateProps = {this.state.location}/>;
		} else if (this.state.location == "Profile_Page"){
			displayPage = <Profile stateProps = {this.state.location}/>;
		}
      	return (
	     	<div>
	    		{displayPage}
	     	</div>
      	)
   }
}
const logger = createLogger()
const store = createStore(Reducer, applyMiddleware(logger))
ReactDOM.render((
	<Provider store={store}>
        <App />
    </Provider>
), document.getElementById('app'))

// ReactDOM.render((
//   <Router history={hashHistory}>
//     <Route path="/" component={App}>
//       <Route path="about" component={About} />
//       <Route path="home" component={Home} />
// 	<Route path="contact" component={Contact} />
//     </Route>
//   </Router>
// ), document.getElementById('app'))