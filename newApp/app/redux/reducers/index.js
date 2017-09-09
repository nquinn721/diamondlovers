import { combineReducers } from 'redux';
import user from './user';
import nav from './nav';
import card from './card';
import image from './image';
import nearby from './nearby';
import dates from './dates';
import settings from './settings';

const rootReducer = combineReducers({
	user,
	nav,
	card,
	image,
	nearby,
	dates,
	settings,
});

export default rootReducer;