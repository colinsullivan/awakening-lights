import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import configureStore from './common/configureStore';
import './index.css';
import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();
var ws;
if (process.env.NODE_ENV !== 'test') {
  ws = new window.WebSocket(`ws://${window.location.hostname}:8080`);
  ws.onerror = () => console.log('WebSocket error');
  ws.onopen = () => console.log('WebSocket connection established');
  ws.onclose = () => console.log('WebSocket connection closed');
  ws.onmessage = (msg) => {
    console.log("msg");
    console.log(msg);
  };
}

ReactDOM.render(
  <Provider store={store}>
    <App ws={ws}/>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
