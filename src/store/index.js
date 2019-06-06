import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootSaga from './sagas'
import rootReducer from './ducks'

const sagaMiddleware = createSagaMiddleware();

//sem redux devtools
//const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

//utilizando o redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(sagaMiddleware)
  ));

sagaMiddleware.run(rootSaga);

export default store
