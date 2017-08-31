import { combineReducers } from 'redux';
import user from './user';
import nav from './nav';
import card from './card'
import image from './image'

const rootReducer = combineReducers({
	user,
	nav,
	card,
	image,
});

export default rootReducer;