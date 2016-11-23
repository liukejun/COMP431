import { expect } from 'chai'
import { go, sleep, findId, findCSS, By, sendKeys } from './selenium'

// TODO add your test user credentials here!
exports.creds = {
    username: 'kl50',
    password: 'enter-off-window',
    //newheadline: 'newheadline'
}

exports.login = () => 
    sleep(2000)
    .then(findId('loginUsername').clear())
    .then(findId('loginPwd').clear())
    .then(findId('loginUsername').sendKeys(exports.creds.username))
    .then(findId('loginPwd').sendKeys(exports.creds.password))
    .then(findId('loginActionBtn').click())
    .then(sleep(2000))

exports.register = () =>
    sleep(2000)
    .then(findId('register_an').sendKeys('liukejun'))
    .then(findId('register_dn').sendKeys('chris'))
    .then(findId('register_em').sendKeys('liukejun5@gmail.com'))
    .then(findId('register_pn').sendKeys('1231231234'))
    .then(findId('register_btn').sendKeys('04/06/1994'))
    .then(findId('register_zip').sendKeys('77005'))
    .then(findId('register_pwd').sendKeys('123'))
    .then(findId('register_pwdc').sendKeys('123'))
    .then(findId('register-submit').click())
    .then(sleep(2000))
exports.post = () =>
    sleep(200)
    .then(findId('postContent').clear())
    .then(findId('postContent').sendKeys('test new post'))
    .then(findId('main_post').click())
    .then(sleep(500))