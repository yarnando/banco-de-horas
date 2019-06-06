import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import history from '../routes/history'

import rootSaga from './sagas'
import rootReducer from './ducks'

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  sagaMiddleware,
  routerMiddleware(history)
]

//sem redux devtools
//const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

//utilizando o redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(connectRouter(history)(rootReducer), composeEnhancers(
    applyMiddleware(...middlewares)
  ));

sagaMiddleware.run(rootSaga);

export default store
