import { expect } from 'chai'
import { go, sleep, findId, findCSS, By, sendKeys } from './selenium'
import common from './common'

describe('Test Profile Page', () => {

    const username = 'kl50'

    before('should log in', (done) => {
        go().then(common.login).then(done)
        .then(sleep(800))
        .then(findId('navToProfile').click())
    })

    it('should Update user email and verify', (done) => {
        sleep(2000)
        .then(findId('update_email').clear())
        .then(findId('update_email').sendKeys('klkl@sas.as'))
        .then(findId('update_profile_btn').click())
        .then(sleep(200))
        .then(findId('current-emailAddress').getText()
            .then(text => {
                expect(text).to.equal('klkl@sas.as')
            })
            .then(done))
    })

    it('should Update user zipcode and verify', (done) => {
        sleep(2000)
        .then(findId('update_zipcode').clear())
        .then(findId('update_zipcode').sendKeys('77003'))
        .then(findId('update_profile_btn').click())
        .then(sleep(200))
        .then(findId('current-zipCode').getText()
            .then(text => {
                expect(text).to.equal('77003')
            })
            .then(done))
    })

    it('should Update user password and verify', (done) => {
        sleep(2000)
        .then(findId('update_email').clear())
        .then(findId('update_zipcode').clear())
        .then(findId('update_pwd').clear())
        .then(findId('update_pwdc').clear())
        .then(findId('update_pwd').sendKeys('123'))
        .then(findId('update_pwdc').sendKeys('123'))
        .then(findId('update_profile_btn').click())
        .then(sleep(200))
        .then(findId('profile_msg').getText()
            .then(text => {
                expect(text).to.equal('You have changed ...Password')
            })
            .then(done))
    })

    after('should log out', (done) => {
       // common.logout().then(done)
       findId('main_logout').click()
        .then(sleep(500))
        .then(findId('landing_title').getText()
        .then(text => {
            expect(text).to.equal('Rice Book')
            }))
        .then(done)
    })
})