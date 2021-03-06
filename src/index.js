import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App.jsx";
import WebsocketDispatcher from "./common/WebsocketDispatcher.js";

import configureStore from "common/configureStore";

const websocketDispatcher = new WebsocketDispatcher();

const store = configureStore(
  null,
  [websocketDispatcher.middleware]
);
websocketDispatcher.setStore(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
