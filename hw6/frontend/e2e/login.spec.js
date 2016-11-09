import { expect } from 'chai'
import { go, sleep, findId, findCSS, By, sendKeys } from './selenium'
import common from './common'

describe('Test landing(login) Page', () => {

    const username = 'kl50'

    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('should log in as the test user', (done) => {
        sleep(5000)
        .then(findId('user-info-displayName').getText()
            .then(text => {
                expect(text).to.equal(username)
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
