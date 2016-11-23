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
describe('Validate following functionality', () => {
	it('should Add the Follower user and verify following count increases by one!', (done) => {
			fetch(url('/following/liukejun'), getOptions('PUT'))
			.then(res => {
				expect(res.status).to.eql(200)
				return res.text()
			})
			.then(body => {
				var result = JSON.parse(body)
				expect(body).to.eql(JSON.stringify({username:'Defaults to loggedInUser', following: ['kl50', 'sep1','liukejun']}))
				expect(result.following.length).to.eql(3)
			})
			.then(done)
			.catch(done)
	 	}, 500)

	it('should Remove the Follower user and verify following count decreases by one!', (done) => {
			fetch(url('/following/liukejun'), getOptions('DELETE'))
			.then(res => {
				expect(res.status).to.eql(200)
				return res.text()
			})
			.then(body => {
				var result = JSON.parse(body)
				expect(body).to.eql(JSON.stringify({username:'Defaults to loggedInUser', following: ['kl50', 'sep1']}))
				expect(result.following.length).to.eql(2)
			})
			.then(done)
			.catch(done)
	 	}, 500)
})