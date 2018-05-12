import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import './index.css';
import App from './App.jsx';
import WebsocketDispatcher from './WebsocketDispatcher.js';
import { create_pixels } from './common/model'

import { pixels } from './common/reducers'
import { websocketReadyState } from './reducers'

import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'

 var initialState = {
  pixels: create_pixels(50 + 12),
};
var websocketDispatcher = null;
var middleware;
websocketDispatcher = new WebsocketDispatcher();

middleware = [];

if (process.env.NODE_ENV === 'development') {
  middleware.push(websocketDispatcher.middleware);
  middleware.push(logger);
}

const store = createStore(combineReducers({
  pixels,
  websocketReadyState
}), initialState, applyMiddleware(...middleware));
websocketDispatcher.setStore(store);
//var ws;
//if (process.env.NODE_ENV !== 'test') {
//}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
