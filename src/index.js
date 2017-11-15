import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import Routes from './Routes';
import reducers from './reducers';
import { logger } from 'redux-logger'
import Thunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(Thunk, logger)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Routes />
  </Provider>
  , document.querySelector('.container'));
