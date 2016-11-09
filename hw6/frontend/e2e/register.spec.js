import { expect } from 'chai'
import { go, sleep, findId, findCSS, By, sendKeys } from './selenium'
import common from './common'

describe('Test landing(regsiter) Page', () => {
	it('should regsiter new user', (done) => {
	        sleep(5000)
	        .then(common.register())
	        .then(findId('landing_msg').getText()
	            .then(text => {
	                expect(text).to.equal('success registered as: liukejun')
	            })
	            .then(done))
	    })
})