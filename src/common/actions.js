/**
 *  @file       actions.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/
import onecolor from "onecolor";

import {
  WS_READYSTATE_UPDATE,
  FIXTURE_OFF,
  FIXTURE_COLOR
} from './actionTypes'

export function websocketReadyStateChanged (readyState) {
  return {
    type: WS_READYSTATE_UPDATE,
    payload: { readyState }
  };
}

export function fixtureOff ({ id }) {
  return {
    type: FIXTURE_OFF,
    payload: { id }
  };
}

export function fixtureColor ({id, color}) {
  return {
    type: FIXTURE_COLOR,
    payload: { id, color }
  };
}

export function hydrateReceivedAction (action) {
  action.received = true;
  switch (action.type) {
    case FIXTURE_COLOR:
      action.payload.color = onecolor(action.payload.color);
      break;
    
    default:
      break;
  }
  return action
}
