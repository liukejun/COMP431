import React from 'react'
import TestUtils from 'react-addons-test-utils'
import {findDOMNode} from 'react-dom'
import {expect} from 'chai'

import { ToDoItem } from './todoItem'

describe('Validate ToDoItem', () => {

	it('should display a single ToDo', () => {
		// use TestUtils.renderIntoDocument
		// findDOMNode and assert 3 children of the ToDoItem element
		// assert the className is ''
		// assert the innerHTML of the todo is the text you initially set
		const node = TestUtils.renderIntoDocument(<div>
				<ToDoItem text="TestItem" done={false} toggle={_=>_} remove={_=>_}/>
			</div>)
		const elements = findDOMNode(node).children[0];//get the todoitems
		expect(elements.children.length).to.equals(3)

		expect(elements.children[0].className).to.equal('check glyphicon glyphicon-check')
		expect(elements.children[1].className).to.equal('')
		expect(elements.children[2].className).to.equal('destroy glyphicon glyphicon-remove')

		expect(elements.children[1].innerHTML).to.equals('TestItem')

	})

	it('should toggle completed when clicked', () => {
		let toggled = false
		// use TestUtils.renderIntoDocument
		// when the checkbox is clicked via TestUtils.Simulate.click()
		// we expect the variable toggled to be true
		const node = TestUtils.renderIntoDocument(<div>
				<ToDoItem text="TestItem" done={false} toggle={() => {toggled=true}} remove={_=>_}/>
			</div>)
		const elements = findDOMNode(node).children[0]
		TestUtils.Simulate.click(elements.children[0])
		expect(toggled).to.be.true
	})

	it('should remove an item when clicked', () => {
		let removed = false
		// use TestUtils.renderIntoDocument
		// when the remove button is clicked via TestUtils.Simulate.click()
		// we expect the variable removed to be true
		const node = TestUtils.renderIntoDocument(<div>
				<ToDoItem text="TestItem" done={false} toggle={_=>_} remove={() => {removed=true}}/>
			</div>)
		const elements = findDOMNode(node).children[0]
		TestUtils.Simulate.click(elements.children[2])
		expect(removed).to.be.true
	})

	it('should display a completed ToDo', () => {
		// use TestUtils.renderIntoDocument
		// the item should have done=true
		// assert that the rendered className is "completed"
		const node = TestUtils.renderIntoDocument(<div>
				<ToDoItem text="TestItem" done={true} toggle={_=>_} remove={_=>_}/>
			</div>)
		const elements = findDOMNode(node).children[0]
		expect(elements.children[1].className).to.equals('completed')
	})

})
