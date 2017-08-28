import { combineReducers } from 'redux';
import users from './users';
import activeUser from './active-user';

const rootReducer = combineReducers({
	users,
	activeUser
});

export default rootReducer;