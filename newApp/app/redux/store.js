import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import app from './reducers';
const middleware = [thunk];
const store = createStore(app, composeWithDevTools(applyMiddleware(...middleware)));
export default store;