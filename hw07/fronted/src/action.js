export const NAVIGATE_PAGE = 'NAVIGATE_PAGE'
export const CLEAR_ARTICLES = 'CLEAR_ARTICLES'
export const ADD_ARTICLES = 'ADD_ARTICLES'
export const ADD_COMMENTS = 'ADD_COMMENTS'
export const FILTER_ARTICLE = 'FILTER_ARTICLE'
export const CLEAR_FRIENDS = 'CLEAR_FRIENDS'
export const ADD_FRIENDS = 'ADD_FRIENDS'
export const ADD_FRIENDS_HEADLINE = 'ADD_FRIENDS_HEADLINE'
export const ADD_FRIENDS_AVATAR = 'ADD_FRIENDS_AVATAR'
export const CLEAR_INFO = 'CLEAR_INFO'
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
export const UPDATE_NAME = 'UPDATE_NAME'
export const UPDATE_HEADLINE = 'UPDATE_HEADLINE'
export const UPDATE_AVATAR = 'UPDATE_AVATAR'
export const UPDATE_ZIPCODE = 'UPDATE_ZIPCODE'
export const UPDATE_DOB = 'UPDATE_DOB'
export const UPDATE_EMAIL = 'UPDATE_EMAIL'
export const ERROR = 'ERROR'
export const SUCCESS = 'SUCCESS'
export const POST_ARTICLE = 'POST_ARTICLE'
export const ADD_AVATAR = 'ADD_AVATAR'
export const EDIT_ARTICLES = 'EDIT_ARTICLES'
export const DELETE_FRIEND = 'DELETE_FRIEND'
export const CLEAR_COMMENTS = 'CLEAR_COMMENTS'
//navigate pages according to text parameter
export function navigatePages(text) {
	return {
		type: NAVIGATE_PAGE,
		text
	}
}
//clear article states
export function clearArticles() {
	return {
		type: CLEAR_ARTICLES
	}
}
//add a new article to state
export function addArticles(id, author, img, date, text, comments, isShow) {
	return {
		type: ADD_ARTICLES,
		id,
		author,
		img,
		date,
		text,
		comments,
		isShow
	}
}
// add a new comment to state
export function addComments(id, author, commentId, date, text) {
	return {
		type: ADD_COMMENTS,
		id,
		author,
		commentId,
		date,
		text
	}
}
//change article's isShow property in state according to parameter
export function filterArticle(text) {
	return {
		type: FILTER_ARTICLE,
		text
	}
}
//add author's avatar at article in state
export function addAvatarInArticle(id, avatar) {
	return {
		type: ADD_AVATAR,
		id,
		avatar
	}
}
//clear friends in state
export function clearFriends() {
	return {
		type: CLEAR_FRIENDS
	}
}
//add friends in state
export function addFriends(id, headline, avatar) {
	return {
		type: ADD_FRIENDS,
		id,
		headline,
		avatar
	}
}
//update friend's headline in state
export function addFriendHeadline(id, headline) {
	return {
		type: ADD_FRIENDS_HEADLINE,
		id,
		headline
	}
}
//update friend's avatar in state
export function addFriendAvatar(id, avatar) {
	return {
		type: ADD_FRIENDS_AVATAR,
		id,
		avatar
	}
}
//clear user information in state
export function clearInfo() {
	return {
		type: CLEAR_INFO
	}
}
// add password in state
export function addPwd(password) {
	return {
		type: UPDATE_PASSWORD,
		password
	}
}
// add username in state
export function addName(text) {
	return {
		type: UPDATE_NAME,
		text
	}
}
// add user headline in state
export function addHeadline(text) {
	return {
		type: UPDATE_HEADLINE,
		text
	}
}
// add user avatar in state
export function addAvatar(avatar) {
	return {
		type: UPDATE_AVATAR,
		avatar
	}
}
//add user zipcode in state
export function addZipcode(zipcode) {
	return {
		type: UPDATE_ZIPCODE,
		zipcode
	}
}
//add user birthday in state
export function addDOB(dob) {
	return {
		type: UPDATE_DOB,
		dob
	}
}
//add user email in state
export function addEmail(email) {
	return {
		type: UPDATE_EMAIL,
		email
	}
}
// add new error in state
export function addError(text) {
	return {
		type: ERROR,
		text
	}
}
// add success info in state
export function addSuccess(text) {
	return {
		type: SUCCESS,
		text
	}
}

export function editArticle(id, text) {
	return {
		type: EDIT_ARTICLES,
		id,
		text
	}
}
export function deleteFriend(id) {
	return {
		type: DELETE_FRIEND,
		id
	}
}
export function clearComments(id) {
	return {
		type:CLEAR_COMMENTS,
		id
	}
}