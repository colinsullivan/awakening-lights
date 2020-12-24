/**
 *  @file       configureStore.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import _ from "lodash";

import { create_pixels, create_fixture } from "./model";

import rootReducer from "./reducers";

const fixturesList = [
  create_fixture("workspace", 0, 49),
  create_fixture("bedside", 50, 61),
  create_fixture("abovedesk", 62, 121)
];
const defaultState = {
  fixtures: _.keyBy(fixturesList, "id"),
  pixels: create_pixels(122)
};

export default function configureStore(
  additionalState = {},
  additionalMiddleware = []
) {
  const state = {
    ...defaultState,
    ...additionalState
  };
  var middleware;

  middleware = additionalMiddleware;

  if (process.env.NODE_ENV === "development") {
    middleware.push(logger);
  }

  return createStore(rootReducer, state, applyMiddleware(...middleware));
}
