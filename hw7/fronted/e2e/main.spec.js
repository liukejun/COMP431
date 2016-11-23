import { expect } from 'chai'
import { go, sleep, findId, findCSS, By, sendKeys } from './selenium'
import common from './common'

describe('Test main(headline, follower) Page', () => {

    const username = 'kl50'
    let friendNum
    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('should Update headline and verify change', (done) => {
        sleep(1000)
        .then(findId('updateheadline_newheadline').clear())
        .then(findId('updateheadline_newheadline').sendKeys('updateheadline'))
        .then(findId('updateheadline_btn').click())
        .then(sleep(500))
        .then(findId('userinfo-current-state').getText()
            .then(text => {
                expect(text).to.equal('updateheadline')
            })
            .then(done))
        .then(sleep(500))
        .then(findId('updateheadline_newheadline').clear())
        .then(findId('updateheadline_newheadline').sendKeys('test'))
        .then(findId('updateheadline_btn').click())
        .then(sleep(500))
        .then(findId('userinfo-current-state').getText()
            .then(text => {
                expect(text).to.equal('test')
            }))
    })

    it('should Remove the Follower user and verify following count decreases by one', (done) => {
        sleep(1000)
        .then(findId('friendSection_title').getText()
            .then(text => {
                friendNum = parseInt(text)
            }))
        .then(findId('delete_friend').click())
        .then(sleep(200))
        .then(findId('friendSection_title').getText()
            .then(text => {
                expect(text).to.equal((friendNum-1).toString())
            })
            .then(done))
    })
    it('should Add the Follower user and verify following count increases by one', (done) => {
        sleep(1000)
        .then(findId('friendSection_title').getText()
            .then(text => {
                friendNum = parseInt(text)
            }))
        .then(findId('findFriend').clear())
        .then(findId('findFriend').sendKeys('jx17'))
        .then(findId('findFriend_btn').click())
        .then(sleep(200))
        .then(findId('friendSection_title').getText()
            .then(text => {
                expect(text).to.equal((friendNum+1).toString())
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