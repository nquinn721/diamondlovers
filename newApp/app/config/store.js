import { createStore, applyMiddleware } from 'redux';
import app from '../reducers';
import thunk from 'redux-thunk';

const store = createStore(app, applyMiddleware(thunk));
export default store;
// import createSagaMiddleware from 'redux-saga';
// import { composeWithDevTools } from 'redux-devtools-extension';

// import reducer from '../reducers';
// import rootSaga from './sagas';

// const sagaMiddleware = createSagaMiddleware();
// const middleware = [sagaMiddleware];

// const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

// sagaMiddleware.run(rootSaga);

// export default store;