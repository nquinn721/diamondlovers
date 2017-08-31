import { combineReducers } from 'redux';
import user from './user';
import users from './users';
import nav from './nav';
import card from './card'
import image from './image'

const rootReducer = combineReducers({
	user,
	users,
	nav,
	card,
	image,
});

export default rootReducer;