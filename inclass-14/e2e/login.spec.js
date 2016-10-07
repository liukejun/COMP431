import { expect } from 'chai'
import { go, sleep, findId, findCSS, By, sendKeys } from './selenium'
import common from './common'

describe('Test Dummy Server Example Page', () => {

    const preamble = 'you are logged in as'

    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('should log in as the test user', (done) => {
        sleep(500)
        .then(findId('message').getText()
            .then(text => {
                expect(text.indexOf(preamble)).to.equal(0)
            })
            .then(done))
    })
    var oldMsg = ''
    var oldheadline = ''
    const pre = 'you are logged in as kl50 "'
    const post ='"'
    it("Update the headline and verify the change", (done) => {
        // IMPLEMENT ME
        // find the headline input
        // .sendKeys(new headline message)
        // verify the headline is updated
        // .sendKeys(the old headline message)
        // verify the headline is updated

        // sleep(500)
        // .then(findId('newHeadline').sendKeys('test me'))
        // .then(findId('headline').click())
        // .then(sleep(1000))
        // .then(findId('message').getText()
        //     .then(text => {
        //             expect(text).to.equal('Update headline to "test me"')
        //         })
        //     .then(done))
        findId('message').getText()
        .then(text => {
                // 
                console.log(text)
            })
        .then(oldheadline = oldMsg.substring(pre.length))
        .then(console.log(oldheadline))
        .then(sleep(500))
        .then(findId('newHeadline').sendKeys('I am a new headline'))
        .then(findId('headline').click())
        .then(sleep(1000))
        .then(findId('message').getText()
            .then(text => {
                    expect(text).to.equal('Update headline to "I am a new headline"')
                }))
        .then(findId('newHeadline').clear())
        .then(findId('newHeadline').sendKeys('I am the old headline'))
        .then(findId('headline').click())
        .then(sleep(1000))
        .then(findId('message').getText()
            .then(text => {
                    expect(text).to.equal('Update headline to "I am the old headline"')
                })
            .then(done))

    })

    after('should log out', (done) => {
        common.logout().then(done)
    })
})
