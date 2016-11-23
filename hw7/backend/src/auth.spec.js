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

describe('Validate auth functionality', () => {

	it('should register a new user!', (done) => {
		fetch(url("/register"), getOptions('POST',{username: "kl50test", password: "xyz"}))
		.then(res => {
			expect(res.status).to.eql(200)
			return res.text()
		})
		.then(body => {
			expect(body).to.eql(JSON.stringify({username:"kl50test",result:"register success"}))
		})
		.then(done)
		.catch(done)
 	}, 500)

	it('should login as test user!', (done) => {
		fetch(url('/login'), getOptions('POST', {username: "kl50test", password: "xyz"}))
		.then(res => {
			expect(res.status).to.eql(200)
			return res.text()
		})
		.then(body => {
			expect(body).to.eql(JSON.stringify({username: "kl50test", result: 'success'}))
		})
		.then(done)
		.catch(done)
 	}, 500)

})