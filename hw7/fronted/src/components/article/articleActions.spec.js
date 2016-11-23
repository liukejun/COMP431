import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

describe('Validate Article actions', function(){

  let Action, actions, login, updateHeadline, url, getArticle, filterArticle
  beforeEach(() => {
    if (mockery.enable) {
    	mockery.enable({warnOnUnregistered: false, useCleanCache:true})
    	mockery.registerMock('node-fetch', fetch)
    	require('node-fetch')
    }
    //import client codes after the call of mockery
    Action = require('../../action').default
    actions = require('../../action')
    getArticle = require('../auth/authActions').getArticle
    filterArticle = require('../../action').filterArticle
    url = require('../auth/authActions').url
  })

  afterEach(() => {
    if (mockery.enable) {
    	mockery.deregisterMock('node-fetch')
    	mockery.disable()
    }
  })

  it('should fetch articles', (done) => {
    // the result from the mocked AJAX call
    const username = 'kl50'
    const headline = 'A new headline!'
    const articles = [
                        {
                          "_id": 0,
                          "author": "string",
                          "data": "1111111",
                          "img": "string",
                          "text": "string",
                          "comments": []
                        }
                      ]
    // mock get articles
    mock(`${url}/articles`, {
      method: 'GET',
      headers: {'Content-Type':'application/json'},
      json: { articles }
    })


    getArticle()(
      (action) => {
        switch(action.type) {
          case 'ADD_ARTICLES':
            expect(action).to.eql({ 
              type: actions.ADD_ARTICLES, id: 0, author: 'string', 
              img: 'string', date: 'NaN-NaN-NaN', text: 'string', comments: [], isShow: true
            })
            break;
        }
      })
    .then(done)
    .catch(done)

  })

  it('should update the search keyword', function() {
    let text = 'kl50'
      let expectedAction = {
          type: 'FILTER_ARTICLE',
          text
      }
      expect(filterArticle(text)).to.eql(expectedAction)
  })
})
