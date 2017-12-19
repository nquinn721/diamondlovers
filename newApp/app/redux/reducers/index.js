import { combineReducers } from 'redux';
import user from './user';
import nav from './nav';
import card from './card';
import image from './image';
import nearby from './nearby';
import dates from './dates';
import settings from './settings';
import chat from './chat';
import yelp from './yelp';

const rootReducer = combineReducers({
	user,
	nav,
	card,
	image,
	nearby,
	dates,
	settings,
	chat,
	yelp,
});

export default rootReducer;