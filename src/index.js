import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App.jsx";
import WebsocketDispatcher from "./common/WebsocketDispatcher.js";
import { create_pixels } from "./common/model";

import { pixels, websocketReadyState } from "common/reducers";
import configureStore from "common/configureStore";

import { createStore, applyMiddleware, combineReducers } from "redux";

const websocketDispatcher = new WebsocketDispatcher();

const store = configureStore(
  {
    websocketReadyState
  },
  [websocketDispatcher.middleware]
);
websocketDispatcher.setStore(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
