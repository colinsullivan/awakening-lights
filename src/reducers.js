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
import {
  WS_READYSTATE_UPDATE
} from './actionTypes'

export function websocketReadyState (state = READY_STATES.CLOSED, action) {
  switch (action.type) {
    case WS_READYSTATE_UPDATE:
      return action.payload;
    default:
      return state;
  }
}
