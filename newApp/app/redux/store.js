import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import app from './reducers';
const middleware = [thunk, (store) => (next) => (action) => {
	let user = store.getState().user;
	console.log(user);
	
	if(user.notLoggedIn)
		console.log('NOT LOGGED IN');
		
	
	
}];
const store = createStore(app, composeWithDevTools(applyMiddleware(...middleware)));
export default store;