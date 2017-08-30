import { combineReducers } from 'redux';
import user from './user';
import users from './users';
import activeUser from './active-user';
import nav from './nav';
import card from './card'

const rootReducer = combineReducers({
	user,
	users,
	nav,
	card,
	activeUser
});

export default rootReducer;