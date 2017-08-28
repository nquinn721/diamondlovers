import { combineReducers } from 'redux';
import user from './user';
import users from './users';
import activeUser from './active-user';
import nav from './nav';

const rootReducer = combineReducers({
	user,
	users,
	nav,
	activeUser
});

export default rootReducer;