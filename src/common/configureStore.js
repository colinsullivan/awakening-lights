/**
 *  @file       configureStore.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

import rootReducer from './reducers'

export default function configureStore (initialState) {
  var middleware;

  middleware = [];

  if (process.env.NODE_ENV === 'development') {
    middleware.push(logger);
  }

  return createStore(rootReducer, initialState, applyMiddleware(...middleware));
}
