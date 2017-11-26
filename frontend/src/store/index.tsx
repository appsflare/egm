import { connectRouter, routerMiddleware } from 'connected-react-router';
import { applyMiddleware, compose, createStore, Store } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { History } from 'history';

import { reducers } from 'reducers';
import { isProduction } from 'utils';

import { composeWithDevTools } from 'redux-devtools-extension';

export const configureStore = (initialState: {}, history: History, modulesReducer: {} = {}): Store<any> => {
  // Logger
  const logger = createLogger();

  // Enhancer
  let enhancer: any;
  if (isProduction) {
    enhancer = applyMiddleware(routerMiddleware(history), thunk, promiseMiddleware(), logger);
  } else {

    enhancer = compose(
      applyMiddleware(routerMiddleware(history), thunk, promiseMiddleware(), logger),      
    );

    enhancer = composeWithDevTools(enhancer);
  }

  // Store
  const store = createStore(connectRouter(history)(reducers(modulesReducer)), initialState, enhancer);

  // Enable Webpack hot module replacement for reducers
  if (!isProduction && module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducers = require('reducers').reducers;
      store.replaceReducer(connectRouter(history)(nextReducers));
    });
  }

  return store;
};
