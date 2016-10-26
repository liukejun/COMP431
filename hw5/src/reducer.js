import { combineReducers } from 'redux';
import { NAVIGATE_PAGE, CLEAR_ARTICLES, ADD_ARTICLES, ADD_COMMENTS, FILTER_ARTICLE } from './action.js'
import { CLEAR_FRIENDS, ADD_FRIENDS, ADD_FRIENDS_HEADLINE, ADD_FRIENDS_AVATAR } from './action.js'
import { CLEAR_INFO, UPDATE_PASSWORD, UPDATE_NAME, UPDATE_HEADLINE, UPDATE_AVATAR } from './action.js'
import { UPDATE_ZIPCODE, UPDATE_DOB, UPDATE_EMAIL } from './action.js'
import { ERROR, SUCCESS, POST_ARTICLE, ADD_AVATAR } from './action.js'
export const navigatePages = (state =  {
	nextPage: "Landing_Page",
	}, action) => {
	switch(action.type) {
		case 'NAVIGATE_PAGE':
			return {
				nextPage: action.text,
			};
		default: 
			return state
	}
}
export const articles = (state = {
	article: []
	}, action) => {
	switch(action.type) {
		case 'POST_ARTICLE':
			return {
				article: state.article
			}
		case 'CLEAR_ARTICLES':
			return {
				article: []
			}
		case 'ADD_ARTICLES':
			return {
				article: [
					...state.article,
					{id: action.id, author: action.author, img: action.img, date: action.date, text: action.text, comments: [], isShow: true, avatar: ''}
				]
			}
		case 'ADD_COMMENTS':
			return {
				article:
					state.article.map(({id, author, img, date, text, comments,isShow, avatar})=>{
						if (id === action.id){
							var comments = [
								...comments,
								{id: action.id, author: action.author, commentId: action.commentId, date: action.date, text: action.text}
							]
							
							return {id, author, img, date, text, comments, isShow, avatar}
						} else {
							return {id, author, img, date, text, comments, isShow, avatar}
						}
					})
			}
		case 'ADD_AVATAR':
			return {
				article:
					state.article.map(({id, author, img, date, text, comments,isShow, avatar})=>{
						if (author === action.id){
							var avatar = action.avatar
							return {id, author, img, date, text, comments, isShow, avatar }
						} else {
							return {id, author, img, date, text, comments, isShow, avatar}
						}
					})
			}
		case 'FILTER_ARTICLE':
			return {
				article:
					state.article.map(({id, author, img, date, text, comments,isShow, avatar})=>{
						if (action.text == ''){
							var isShow = true
							return {id, author, img, date, text, comments, isShow, avatar}
						}
						if (author === action.text || text === action.text){
							var isShow = true
							return {id, author, img, date, text, comments, isShow, avatar}
						} else {
							var  isShow = false
							return {id, author, img, date, text, comments, isShow, avatar}
						}
					})
			}
		default:
			return state
	}
}
export const friends = (state = {
	friends: []
	}, action) => {
	switch(action.type) {
		case 'CLEAR_FRIENDS':
			return {
				friends: []
			}
		case 'ADD_FRIENDS':
			return {
				friends: [
					...state.friends,
					{id: action.id, headline: undefined, avatar: undefined}
				]
			}
		case 'ADD_FRIENDS_HEADLINE':
			return {
				friends: 
					state.friends.map(({id, headline, avatar}) => {
						if (id === action.id) {
							return {id: id, headline: action.headline, avatar: avatar}
						} else {
							return {id, headline, avatar}
						}
					})
			}
		case 'ADD_FRIENDS_AVATAR':
			return {
				friends: 
					state.friends.map(({id, headline, avatar}) => {
						if (id === action.id) {
							return {id: id, headline: headline, avatar: action.avatar}
						} else {
							return {id, headline, avatar}
						}
					})
			}
		default:
			return state
	}
}
export const userInfo = (state = {
	username: undefined,
	headline: undefined,
	avatar: undefined,
	zipcode: undefined,
	dob: undefined,
	email: undefined,
	password: undefined,
	}, action) => {
	switch (action.type) {
		case 'CLEAR_INFO':
			return {
				username: undefined, headline: undefined, avatar: undefined, zipcode: undefined,
				dob: undefined, email: undefined, password: undefined
			}
		case 'UPDATE_PASSWORD':
			return {
				username: state.text, headline: state.headline, avatar: state.avatar, 
				zipcode: state.zipcode, dob: state.dob, email: state.email, password: action.password
			}
		case 'UPDATE_NAME':
			return {
				username: action.text, headline: state.headline, avatar: state.avatar,
				zipcode: state.zipcode, dob: state.dob, email: state.email,
				password: state.password
			}
		case 'UPDATE_HEADLINE':
			return {
				username: state.username, headline: action.text, avatar: state.avatar,
				zipcode: state.zipcode, dob: state.dob, email: state.email,
				password: state.password
			}
		case 'UPDATE_AVATAR':
			return {
				username: state.username, headline: state.headline, avatar: action.avatar,
				zipcode: state.zipcode, dob: state.dob, email: state.email,
				password: state.password
			}
		case 'UPDATE_ZIPCODE':
			return {
				username: state.username, headline: state.headline, avatar: state.avatar,
				zipcode: action.zipcode, dob: state.dob, email: state.email,
				password: state.password
			}
		case 'UPDATE_DOB':
			return {
				username: state.username, headline: state.headline, avatar: state.avatar,
				zipcode: state.zipcode, dob: action.dob, email: state.email,
				password: state.password
			}
		case 'UPDATE_EMAIL':
			return {
				username: state.username, headline: state.headline, avatar: state.avatar,
				zipcode: state.zipcode, dob: state.dob, email: action.email,
				password: state.password
			}
		default:
			return state
	}
}
export const updateError = (state = {
	error: ''
	}, action) => {
	switch (action.type) {
		case 'ERROR':
			return {
				error: action.text
			}
		default:
			return state
	}
}

export const updateSuccess = (state = {
	success: ''
	}, action) => {
	switch (action.type) {
		case 'SUCCESS':
			return {
				success: action.text
			}
		default:
			return state
	}
}
const Reducer = combineReducers({
	navigatePages,
	userInfo,
	updateError,
	articles,
	friends,
	updateSuccess
});
export default Reducer;