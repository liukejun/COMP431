import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

let Action, actions, login, updateHeadline, url, getUserAvatar, getZipCode, getEmail, getDOB, formatDate
beforeEach(() => {
  if (mockery.enable) {
  	mockery.enable({warnOnUnregistered: false, useCleanCache:true})
  	mockery.registerMock('node-fetch', fetch)
  	require('node-fetch')
  }
  //import client codes after the call of mockery
  Action = require('../action').default
  actions = require('../action')
  updateHeadline = require('./mainActions').updateHeadline
  getUserAvatar = require('../auth/authActions').getUserAvatar
  getEmail = require('../auth/authActions').getEmail
  getZipCode = require('../auth/authActions').getZipCode
  getDOB = require('../auth/authActions').getDOB
  formatDate = require('../auth/authActions').formatDate
  url = require('../auth/authActions').url
})

afterEach(() => {
  if (mockery.enable) {
  	mockery.deregisterMock('node-fetch')
  	mockery.disable()
  }
})

describe('Validate Profile actions', function(){
  it('should update headline', (done) => {
    // the result from the mocked AJAX call
    const username = 'kl50'
    const headline = 'A new headline!'

    mock(`${url}/headline`, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      json: { username, headline }
    })


    updateHeadline('does not matter')(
      (action) => {
      	
      		expect(action).to.eql({ 
          		type: actions.UPDATE_HEADLINE, text: headline
        	})
      })
    .then(done)
    .catch(done)

  })

  it('should fetch the user proile _avatar_ information', (done) => {
    // the result from the mocked AJAX call
  	const username = 'kl50'
  	const avatar = 'someAvatar'
  	mock(`${url}/avatars`, {
      method: 'GET',
      headers: {'Content-Type':'application/json'},
      json: { avatars: [{username, avatar}] }
    })
  	getUserAvatar()((action) => {
  			expect(action).to.eql({
  				type: 'UPDATE_AVATAR', avatar
  			})
  	})
  	.then(done)
  	.catch(done)
  })

  it('should fetch the user proile _zipcode_ information', (done) => {
    // the result from the mocked AJAX call
  	const username = 'kl50'
  	const zipcode = 'somezipcode'

  	mock(`${url}/zipcode`, {
      method: 'GET',
      headers: {'Content-Type':'application/json'},
      json: { username, zipcode }
    })
  	getZipCode()((action) => {
		expect(action).to.eql({
			type: 'UPDATE_ZIPCODE', zipcode
		})
  	})
  	.then(done)
  	.catch(done)
  })

  it('should fetch the user proile _email_ information', (done) => {
    // the result from the mocked AJAX call
  	const username = 'kl50'
  	const email = 'someemail'

  	mock(`${url}/email`, {
      method: 'GET',
      headers: {'Content-Type':'application/json'},
      json: { username, email }
    })
  	getEmail()((action) => {
		expect(action).to.eql({
			type: 'UPDATE_EMAIL', email
		})
  	})
  	.then(done)
  	.catch(done)
  })

  it('should fetch the user proile _dob_ information', (done) => {
    // the result from the mocked AJAX call
  	const username = 'kl50'
  	let dob = '1111111111'
  	dob = formatDate(dob)

  	mock(`${url}/dob`, {
      method: 'GET',
      headers: {'Content-Type':'application/json'},
      json: { username, dob }
    })
  	getDOB()((action) => {
		expect(action).to.eql({
			type: 'UPDATE_DOB', dob
		})
  	})
  	.then(done)
  	.catch(done)
  })

})
