import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
describe('Validate Authentication', function(){

  let Action, actions, login, url, logout, resource
  beforeEach(() => {
    if (mockery.enable) {
    	mockery.enable({warnOnUnregistered: false, useCleanCache:true})
    	mockery.registerMock('node-fetch', fetch)
      require('node-fetch')
    }
    //import client codes after the call of mockery
    Action = require('../../action').default
    actions = require('../../action')
    login = require('./authActions').localLogin
    logout = require('../main/mainActions.js').logout
    url = require('./authActions').url
    resource = require('./authActions').resource
  })

  afterEach(() => {
    if (mockery.enable) {
    	mockery.deregisterMock('node-fetch')
    	mockery.disable()
    }
  })

  it('should log the user in', (done) => {
       // the result from the mocked AJAX call
      const username='kl50'
      const password='does-not-matter'
      const text = 'Main_Page'
      //there are 7 dispatches in login function
      //count equals to 0 means that all dispatches are done
      let count = 7
      mock(`${url}/login`, { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        json:{username, result: "success"}
      })

      login(username,password)(
          (action) => {
            
              switch(action.type){
                case 'UPDATE_NAME':
                  expect(action).to.eql({
                    text: username, type: 'UPDATE_NAME'
                  })
                  break
              }
            count--
        })
      .then( _ => {
        expect(count).to.eql(0)
      })
      .then(done)
      .catch(done)

    })

  it('should not log in an invalid user', (done) => {
       // the result from the mocked AJAX call
      const username='someuser'
      const password='somepassword'
      

      mock(`${url}/login`, { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        status: 401,
        statusText: 'Unauthorized'
      })

      resource('POST', 'login', {username, password})
      .then(
        null,
        (err) => {
        expect(err).to.eql(new Error('Unauthorized'))
      }
    )
    .then(done)
    .catch(done)
      
    })

  it('should log out a user', (done) => {
     // the result from the mocked AJAX call
      const expected = 'Landing_Page'
      let actual
      mock(`${url}/logout`, { 
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
      })
      //there are 6 dispatches in logout function
      //count equals to 0 means that all dispatches are done
      let count = 6
      logout()(
          (action) => {
            try {
              switch(action.type) {
                case 'NAVIGATE_PAGE':
                    console.log(action.text)
                    actual = action.text
                    break;
              }
              expect(actual).to.eql(expected)
              count--;
              if (count == 0) {
                done()
              }
            } catch(err) {
              done(err)
            }  
          
        })
      
    })
    
})