import { expect } from 'chai'
import { go, sleep, findId, findCSS, By, sendKeys } from './selenium'
import common from './common'

describe('Test main(article) Page', () => {


    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('should create new article and validate article appears in feed', (done) => {
        sleep(2000)
        .then(common.post())
        .then(findId('article_text').getText()
            .then(text => {
                expect(text).to.equal('test new post')
            })
            .then(done))
    })

    it('should edit an article and validate changed article text', (done) => {
        sleep(2000)
        .then(findId('article_edit').click())
        .then(findId('article_edit_text').clear())
        .then(findId('article_edit_text').sendKeys('edit text'))
        .then(findId('article_edit_submit').click())
        .then(sleep(500))
        .then(findId('article_text').getText()
            .then(text => {
                expect(text).to.equal('edit text')
            })
            .then(done))
    })

    it('should search a special article and verify', (done) => {
        sleep(2000)
        .then(findId('search_text').clear())
        .then(findId('search_text').sendKeys('test search engine'))
        .then(findId('search_btn').click())
        .then(sleep(500))
        .then(findId('article_author').getText()
            .then(text => {
                expect(text).to.equal('kl50')
            })
            .then(done))
    })

    after('should log out', (done) => {
       findId('main_logout').click()
        .then(sleep(500))
        .then(findId('landing_title').getText()
        .then(text => {
            expect(text).to.equal('Rice Book')
            }))
        .then(done)
    })
})
