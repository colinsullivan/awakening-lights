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
import { create_pixels } from './model'

export default function configureStore () {
  var middleware,
    initialState;

  middleware = [];

  if (process.env.NODE_ENV === 'development') {
    middleware.push(logger);
  }

  initialState = {
    pixels: create_pixels(50 + 12)
  };


  return createStore(rootReducer, initialState, applyMiddleware(...middleware));
}
