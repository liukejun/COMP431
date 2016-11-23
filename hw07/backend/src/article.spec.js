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

describe('Validate article functionality', () => {
	var curr_article = require('./article.js').curr_article
	it('should Create new article and appears in feed!', (done) => {
		fetch(url("/article"), getOptions('POST',{text: "A new post from test"}))
		.then(res => {
			expect(res.status).to.eql(200)
			console.log(curr_article)
			return res.text()
		})
		.then(body => {
			const result = {
		     	'articles' :
		        [{id:3, author:'Scott', img: 'image', text:"A new post from test", comments:[]}]
		     }
			expect(body).to.eql(JSON.stringify(result))
		})
		.then(done)
		.catch(done)
 	}, 500)

	it(' Edit an article and validate changed article text!', (done) => {
		fetch(url('/articles/1'), getOptions('PUT', { text :"test" }))
		.then(res => {
			expect(res.status).to.eql(200)
			return res.text()
		})
		.then(body => {
			const result = {
		          'articles' :
		        [
		          {id:1, author:'Scott', img: 'image', text:'test', 
		                comments: 
		                [
		                    {
		                        id: 0,
		                        author: "string",
		                        text: "string"
		                    }
		                ]
		          }
		        ]
		     }
			expect(body).to.eql(JSON.stringify(result))
		})
		.then(done)
		.catch(done)
 	}, 500)

})