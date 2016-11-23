import { expect } from 'chai'
import { navigatePages, articles, friends, userInfo, updateError, updateSuccess } from './reducer.js';
import * as ActionType from './action.js';

describe('Validate reducer', function(){
  it('should initialize _navigate_pages_ state', function(){

    expect(navigatePages(undefined, {})).to.eql(
    	{
        	nextPage: 'Landing_Page'
    	}
      );
  });

  it('should initialize _articles_ state', function(){

    expect(articles(undefined, {})).to.eql(
    	{
        	article: []
    	}
      );
  });

  it('should initialize _friends_ state', function(){

    expect(friends(undefined, {})).to.eql(
    	{
        	friends: []
    	}
      );
  });

  it('should initialize _userInfo_ state', function(){

    expect(userInfo(undefined, {})).to.eql(
    	{
        	username: undefined,
			headline: undefined,
			avatar: undefined,
			zipcode: undefined,
			dob: undefined,
			email: undefined,
			password: undefined,
    	}
      );
  });

  it('should initialize _updateError_ state', function(){

    expect(updateError(undefined, {})).to.eql(
    	{
        	error: ''
    	}
      );
  });

  it('should initialize _updateSuccess_ state', function(){

    expect(updateSuccess(undefined, {})).to.eql(
    	{
        	success: ''
    	}
      );
  });

  it('should state success (for displaying success message to user)', function(){
  	let action = {
  		type: ActionType.SUCCESS,
  		text: 'success'
  	}
    expect(updateSuccess(undefined, action)).to.eql(
    	{
        	success: 'success'
    	}
      );
  });

  it('should state error (for displaying error message to user)', function(){
  	let action = {
  		type: ActionType.ERROR,
  		text: 'error'
  	}
    expect(updateError(undefined, action)).to.eql(
    	{
        	error: 'error'
    	}
      );
  });

  it('should set the articles', function(){
  	let action = {
  		type: ActionType.ADD_ARTICLES,
  		id: '007',
  		author: 'kejunliu',
  		img: 'image',
  		date: '1994-04-06',
  		text: 'test test',
  		comments: [],
  		isShow: true,
      avatar: ''
  	}
    expect(articles(undefined, action)).to.eql(
    	{
        	article: [
					{
						id: '007',
						author: 'kejunliu',
						img: 'image',
						date: '1994-04-06',
						text: 'test test',
						comments: [],
						isShow: true,
            avatar: ''
					}
				]
    	}
      );
  });
  
  it('should set the search keyword', function(){
  	let action = {
  		type: ActionType.FILTER_ARTICLE,
  		text: 'hello'
  	}
  	let pre_state = {
  		article: [
					{
						id: '007',
						author: 'kejunliu',
						img: 'image',
						date: '1994-04-06',
						text: 'test test',
						comments: [],
						isShow: true,
            avatar: ''
					},
					{
						id: '006',
						author: 'hello',
						img: 'image',
						date: '1994-04-06',
						text: 'test test',
						comments: [],
						isShow: true,
            avatar: ''
					}
				]
  	}
    expect(articles(pre_state, action)).to.eql(
    	{
        	article: [
					{
						id: '007',
						author: 'kejunliu',
						img: 'image',
						date: '1994-04-06',
						text: 'test test',
						comments: [],
						isShow: false,
            avatar: ''
					},
					{
						id: '006',
						author: 'hello',
						img: 'image',
						date: '1994-04-06',
						text: 'test test',
						comments: [],
						isShow: true,
            avatar: ''
					}
				]
    	}
      );
  });

  it('should filter displayed articles by the search keyword', function(){
  	let action = {
  		type: ActionType.FILTER_ARTICLE,
  		text: 'hello'
  	}
  	let pre_state = {
  		article: [
					{
						id: '007',
						author: 'kejunliu',
						img: 'image',
						date: '1994-04-06',
						text: 'test test',
						comments: [],
						isShow: true,
            avatar: ''
					},
					{
						id: '006',
						author: 'hello',
						img: 'image',
						date: '1994-04-06',
						text: 'test test',
						comments: [],
						isShow: true,
            avatar: ''
					}
				]
  	}
    expect(articles(pre_state, action)).to.eql(
    	{
        	article: [
					{
						id: '007',
						author: 'kejunliu',
						img: 'image',
						date: '1994-04-06',
						text: 'test test',
						comments: [],
						isShow: false,
            avatar: ''
					},
					{
						id: '006',
						author: 'hello',
						img: 'image',
						date: '1994-04-06',
						text: 'test test',
						comments: [],
						isShow: true,
            avatar: ''
					}
				]
    	}
      );
  });
});