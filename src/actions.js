/**
 *  @file       actions.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

import {
  WS_READYSTATE_UPDATE
} from './actionTypes'

export function websocketReadyStateChanged (connectionStatus) {
  return {
    type: WS_READYSTATE_UPDATE,
    payload: { connectionStatus }
  };
}
