import { createStore, applyMiddleware } from 'redux';
import app from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
const middleware = [thunk];

const store = createStore(app, 
composeWithDevTools(applyMiddleware(...middleware)));
export default store;
// import createSagaMiddleware from 'redux-saga';

// import reducer from '../reducers';
// import rootSaga from './sagas';

// const sagaMiddleware = createSagaMiddleware();
// const middleware = [sagaMiddleware];

// const store = createStore(reducer, );

// sagaMiddleware.run(rootSaga);

// export default store;