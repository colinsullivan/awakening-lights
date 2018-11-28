import express from 'express'
import http from 'http'
import url from 'url'
import WebSocket from 'ws'

import configureStore from '../common/configureStore'
import { create_pixels } from '../common/model'

const PORT = process.env.REACT_APP_SERVER_PORT;
const app = express();

var OPC = new require('./opc'),
  client,
  store = configureStore({
    pixels: create_pixels(50 + 12)
  });

if (process.env.NODE_ENV !== 'development') {
  client = new OPC('localhost', 7890);
}

app.use(function (req, res) {
  res.send({ msg: "hello" });
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws, req) {
  console.log("connection!");
  const location = url.parse(req.url, true);
  // You might use location.query.access_token to authenticate or share sessions
  // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

  ws.on('message', function incoming(message) {
    if (process.env.NODE_ENV === 'development') {
      console.log("message");
      console.log('received: %s', message);
    }

    let msgObj = JSON.parse(message);

    if (msgObj && msgObj.hasOwnProperty('action')) {
      store.dispatch(msgObj.action);
    }

  });

  ws.on('error', () => console.log('errored'));

  ws.send(JSON.stringify({
    action: {
      type: 'INIT_STATE',
      payload: store.getState()
    }
  }));
});

server.listen(PORT, function listening() {
  console.log('Listening on %d', server.address().port);
});

var pixel_map = function (pixel) {
  var led = pixel;

  return led;
};
// main animation loop
function draw () {
  var t = new Date().getTime(),
    state = store.getState(),
    i;


  client.mapPixels(
    pixel_map,
    state.pixels
  );

}
if (client) {
  setInterval(draw, 30);
}
