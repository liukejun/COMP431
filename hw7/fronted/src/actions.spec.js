import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

let navigatePages, addSuccess, addError, resource, url
beforeEach(() => {
  if (mockery.enable) {
  	mockery.enable({warnOnUnregistered: false, useCleanCache:true})
  	mockery.registerMock('node-fetch', fetch)
  	require('node-fetch')
  }
  //import client codes after the call of mockery
  navigatePages = require('./action.js').navigatePages
  addSuccess = require('./action.js').addSuccess
  addError = require('./action.js').addError
  resource = require('./components/auth/authActions.js').resource
  url = require('./components/auth/authActions.js').url
})

afterEach(() => {
  if (mockery.enable) {
  	mockery.deregisterMock('node-fetch')
  	mockery.disable()
  }
})
describe('Validate actions', function(){
	
	it('resource should be a resource (i.e., mock a request)', (done)=> {
		mock(`${url}/headlines`, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'},
			json: {
        username: 'hi',
        headlines: { username: 'hi', headline: 'ok'}
      }
		})
    const expected = {
      username: 'hi',
      headlines: { username: 'hi', headline: 'ok'}
    }
		resource('GET', 'headlines').then((response) => {
			expect(response).to.eql(expected);
		})
		.then(done)
		.catch(done)
	})


	it ('resource should give me the http error',(done)=>{
    resource('GET', 'headline')
    .then(response=>console.log(response))
    .catch(error => {
      expect(error.message.indexOf('headline')).to.be.at.least(0)
      expect(error).to.exist
      done()
    }).catch(done)
  })

	it('should be able to login/POST', (done)=>{
    // the result from the mocked AJAX call
        const username = 'someuser'
        const password = 'somepassword'
        mock(`${url}/login`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            json:{username, result:'success'}
        })
        resource('POST', 'login', {username, password})
        .then((response)=>{
            expect(response.username).to.eql(username)
            expect(response.result).to.eql('success')
        })
        .then(done)
        .catch(done)
    })

	it('should update error message', function(){
		let text = 'error'
    	let expectedAction = {
      		type: 'ERROR',
      		text
    	}
    	expect(addError(text)).to.eql(expectedAction)
	})

	it('should update success message', function(){
		let text = 'success'
    	let expectedAction = {
      		type: 'SUCCESS',
      		text
    	}
    	expect(addSuccess(text)).to.eql(expectedAction)
	})

	it('should navigate', function(){
		let text = 'Landing_Page'
    	let expectedAction = {
      		type: 'NAVIGATE_PAGE',
      		text
    	}
    	expect(navigatePages(text)).to.eql(expectedAction)
	})

})