import { combineReducers } from 'redux';
import user from './user';
import users from './users';
import activeUser from './active-user';

const rootReducer = combineReducers({
	user,
	users,
	activeUser
});

export default rootReducer;