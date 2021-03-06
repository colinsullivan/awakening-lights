/**
 *  @file       WebsocketDispatcher.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

import uuidv4 from "uuid/v4";
import { websocketReadyStateChanged, hydrateReceivedAction } from './actions';

/**
 *  @class        WebsocketDispatcher
 *
 *  @classdesc    Updates redux store with websocket `readyState` and handles
 *  maintaining WebSocket connection.
 **/
class WebsocketDispatcher {
  constructor() {

    this.clientId = uuidv4();
    this.store = null;
    this.ws = null;

    // the actual instance method pulled into the redux middleware, see
    // `handle_middleware` below
    this.middleware = store => next => action => {
      this.handle_middleware(store, next, action);
    };

  }
  /**
   *  A separate setter for the store instance is needed so instance
   *  middleware can be used first.
   **/
  setStore(store) {
    this.store = store;
    this.connect();
  }

  /**
   *  The actual middleware hook.  Simply forwards the action over the WebSocket
   *  when it is dispatched from elsewhere.
   **/
  handle_middleware (store, next, action) {
    if (this.ws && this.ws.readyState === window.WebSocket.OPEN && !action.receivedBy) {
      this.ws.send(JSON.stringify({
        action
      }));
    }
    return next(action);
  }
  /**
   *  Connect a new websocket, bind to event handlers.
   **/
  connect () {
    this.ws = new window.WebSocket(
      `ws://${window.location.hostname}:${process.env.REACT_APP_SERVER_PORT}`
    );
    this.ws.onerror = () => this.handle_error();
    this.ws.onopen = () => this.handle_opened();
    this.ws.onclose = () => this.handle_closed();
    this.ws.onmessage = (msg) => this.handle_message(msg);
  }

  /**
   *  When a new message comes in, if it is an action, dispatch that action.
   **/
  handle_message (message) {
    const msgObj = JSON.parse(message.data);

    if (msgObj && msgObj.hasOwnProperty('action')) {
      this.store.dispatch(hydrateReceivedAction(msgObj.action, this.clientId));
    }
  }

  update_readystate () {
    this.store.dispatch(websocketReadyStateChanged(
        this.ws.readyState
    ));
  }

  handle_opened () {
    this.update_readystate();
  }
  // when closed, wait 1 second and connect a new WebSocket
  handle_closed () {
    console.log("closed");
    this.update_readystate();
    setTimeout(() => this.connect(), 1000);
  }
  handle_error () {
  }
}

export default WebsocketDispatcher;
