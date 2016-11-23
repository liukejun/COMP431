/*
 * Test suite for hello.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3001${path}`

const getOptions = (method, payload)=> {
	const options =  {
	    method,
	    credentials: 'include',
	    headers: {
	      'Content-Type': 'application/json'
	    }
	 }
	if (payload) options.body = JSON.stringify(payload)
	return options
}

describe('Validate profile functionality', () => {

	it('should Update headline headline and verify change!', (done) => {
		fetch(url("/headline"), getOptions('PUT',{ headline: 'Happy' }))
		.then(res => {
			expect(res.status).to.eql(200)
			return res.text()
		})
		.then(body => {
			expect(body).to.eql(JSON.stringify({username:"loggedInUser",headline:'Happy'}))
		})
		.then(done)
		.catch(done)
 	}, 500)

 	it('should  Update user email and verify!', (done) => {
		fetch(url("/email"), getOptions('PUT',{ email : "test this" }))
		.then(res => {
			expect(res.status).to.eql(200)
			return res.text()
		})
		.then(body => {
			expect(body).to.eql(JSON.stringify({username: 'loggedInUser', email: 'test this'}))
		})
		.then(done)
		.catch(done)
 	}, 500)

 	it('should Update user zipcode and verify!', (done) => {
		fetch(url("/zipcode"), getOptions('PUT',{ zipcode : "test this" }))
		.then(res => {
			expect(res.status).to.eql(200)
			return res.text()
		})
		.then(body => {
			expect(body).to.eql(JSON.stringify({username: 'loggedInUser', zipcode: 'test this'}))
		})
		.then(done)
		.catch(done)
 	}, 500)

 	it('should Update user password and verify!', (done) => {
		fetch(url("/password"), getOptions('PUT',{ password : "change password" }))
		.then(res => {
			expect(res.status).to.eql(200)
			return res.text()
		})
		.then(body => {
			expect(body).to.eql(JSON.stringify({username: 'loggedInUser', password: 'change password'}))
		})
		.then(done)
		.catch(done)
 	}, 500)

	

})