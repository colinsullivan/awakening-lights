/**
 *  @file       reducers.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

import { READY_STATES } from './constants'
import { combineReducers } from 'redux'
import { colorPixelRange, offPixelRange } from "./model";
import {
  FIXTURE_OFF,
  FIXTURE_COLOR,
  WS_READYSTATE_UPDATE
} from "./actionTypes";

export function websocketReadyState (state = READY_STATES.CLOSED, action) {
  switch (action.type) {
    case WS_READYSTATE_UPDATE:
      return action.payload.readyState;
    default:
      return state;
  }
}

export function pixels (state = [], action, { fixtures }) {
  var i, j;
  let startPixel, endPixel;
  if (action.payload && action.payload.startPixel) {
    startPixel = action.payload.startPixel;
  } else {
    startPixel = 0;
  }

  if (action.payload && action.payload.endPixel) {
    endPixel = action.payload.endPixel;
  } else {
    endPixel = state.length - 1;
  }
  switch (action.type) {
    case 'INIT_STATE':
      return [...action.payload.pixels];

    case FIXTURE_OFF:
      return [...offPixelRange(state, fixtures[action.payload.id])];

    case FIXTURE_COLOR:
      return [...colorPixelRange(state, fixtures[action.payload.id])];
    
    default:
      return state;
  }
}

export function fixtureReducer (state, action) {
  switch (action.type) {
    case FIXTURE_OFF:
      return {
        ...state
      };

    case FIXTURE_COLOR:
      const { color } = action.payload;
      return {
        ...state,
        color
      };
    
    default:
      return state;
  }
}

export function fixtures (state = {}, action) {
  switch (action.type) {
    case FIXTURE_COLOR:
    case FIXTURE_OFF:
      const { id } = action.payload;
      return {
        ...state,
        [id]: fixtureReducer(state[id], action)
      };
    
    default:
      return state;
  }
}

const bulkReducer = combineReducers({
  websocketReadyState,
  fixtures,
  pixels: (state = []) => state
});

export default function (state, action) {

  let newState = bulkReducer(state, action);
  newState.pixels = pixels(state.pixels, action, newState);
  console.log("newState");
  console.log(newState);

  return newState;
}
