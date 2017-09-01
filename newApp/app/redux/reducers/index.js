import { combineReducers } from 'redux';
import user from './user';
import nav from './nav';
import card from './card';
import image from './image';
import nearby from './nearby';

const rootReducer = combineReducers({
	user,
	nav,
	card,
	image,
	nearby,
});

export default rootReducer;