import { expect } from 'chai'
import { go, sleep, findId, findCSS, By, sendKeys } from './selenium'

// TODO add your test user credentials here!
exports.creds = {
    username: 'kl50',
    password: 'enter-off-window',
    //newheadline: 'newheadline'
}

exports.login = () => 
    sleep(500)
    .then(findId('username').clear())
    .then(findId('password').clear())
    .then(findId('username').sendKeys(exports.creds.username))
    .then(findId('password').sendKeys(exports.creds.password))
    .then(findId('login').click())
    .then(sleep(2000))
exports.logout = () =>
    findId('logout').click()
    .then(sleep(200))
    .then(findId('message').getText()
    .then(text => {
        expect(text).to.equal('You have logged out')
        }))
    // IMPLEMENT ME
    // validate the message says: 'You have logged out'