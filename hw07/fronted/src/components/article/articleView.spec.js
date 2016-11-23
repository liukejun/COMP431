import React from 'react'
import TestUtils from 'react-addons-test-utils'
import {findDOMNode} from 'react-dom'
import {expect} from 'chai'
import { shallow } from 'enzyme';
import { Article } from './article.js'
import { ArticleView } from './articleView.js'
import { PostSection } from '../main/post.js'

describe('Validate ArticlesView ', function(){

	it('should render articles', () => {
		const items = [
			{  id: 1, author: 'kl50', img: 'image', date: '1994-04-06', text: 'test01', comments: [], isShow: true, avatar: 'avatar' },
			{  id: 2, author: 'kl50test', img: 'image_', date: '1994-04-05', text: 'test02', comments: [], isShow: true, avatar: 'avatar' }
		]
		const node = shallow(<ArticleView articleItems={items} />)
		expect(node.find('ul').children().length).to.equal(2)
	})

	it('should dispatch actions to create a new article', () => {
		let added = false
		const node = TestUtils.renderIntoDocument(<div>
				<PostSection postImg={() => _} postTxt={() => { added=true }} user=''/>
			</div>)
		const elements = findDOMNode(node).children[0]
		expect(elements.children.length).to.equal(2)
		const textarea = elements.children[0].children[1].children[0]
		expect(textarea.value).to.equal('Your post here...')
		textarea.value = 'foobar'
		TestUtils.Simulate.change(textarea)
		expect(added).to.be.false
		const postBtn = elements.children[1].children[1].children[0]
	    TestUtils.Simulate.click(postBtn)
		expect(added).to.be.true
	})

})