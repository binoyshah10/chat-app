import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/index';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/index';
import socketMiddleware from '../middleware/socketMiddleware';
import errorMiddleware from '../middleware/errorMiddleware';

const initialiseSagaMiddleware = createSagaMiddleware();

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ 
  trace: true, 
  traceLimit: 25 
}) || compose;

const store = createStore(
  rootReducer,
  storeEnhancers(
    applyMiddleware(initialiseSagaMiddleware, socketMiddleware, errorMiddleware)
  )
);

initialiseSagaMiddleware.run(rootSaga);

export default store;
