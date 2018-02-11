const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');

const app = express();

var OPC = new require('./opc'),
  client = new OPC('localhost', 7890);

var actual_pixels = [];
const numPixels = 80;
let i;
for (i = 0; i < numPixels; i++) {
  actual_pixels.push([0, 0, 0]);
}

app.use(function (req, res) {
  res.send({ msg: "hello" });
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function set_all_pixels (color) {
  let i;
  let rgb = color.rgb
  for (i = 0; i < actual_pixels.length; i++) {
    actual_pixels[i][0] = rgb.g;
    actual_pixels[i][1] = rgb.r;
    actual_pixels[i][2] = rgb.b;
  }
}

function all_pixels_off () {
  let i, j;
  for (i = 0; i < actual_pixels.length; i++) {
    for (j = 0; j < 3; j++) {
      actual_pixels[i][j] = 0;
    }
  }
}

wss.on('connection', function connection(ws, req) {
  const location = url.parse(req.url, true);
  // You might use location.query.access_token to authenticate or share sessions
  // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    let msgObj = JSON.parse(message);

    if (msgObj && msgObj.hasOwnProperty('type')) {
      switch (msgObj.type) {
        case 'color':
          set_all_pixels(msgObj.payload.color);
          break;

        case 'off':
          all_pixels_off();
          break;
        
        default:
          break;
      }
    }

  });

  ws.send('something');
});

server.listen(8080, function listening() {
  console.log('Listening on %d', server.address().port);
});

var pixel_map = function (pixel) {
  var led = pixel;

  return led;
};
// main animation loop
function draw () {
  var t = new Date().getTime(),
    pixels = actual_pixels,
    i;

  //currentAnimation.tick(t);
  //pixels = currentAnimation.get_pixel_buffer();

  //for (i = 0; i < 40; i++) {
    //actual_pixels[i][0] = pixels[i][0];
    //actual_pixels[i][1] = pixels[i][1];
    //actual_pixels[i][2] = pixels[i][2];
  //}

  //for (i = 40; i < 80; i++) {
    //actual_pixels[i][0] = pixels[79 - i + 40][0];
    //actual_pixels[i][1] = pixels[79 - i + 40][1];
    //actual_pixels[i][2] = pixels[79 - i + 40][2];
  //}

  client.mapPixels(
    pixel_map,
    pixels
  );
  //if (process.env.SIMULATOR) {
    //client.mapPixels(
      //pixel_map,
      //pixels
    //);
  //} else {
    //client.mapPixels(
      //pixel_map,
      //actual_pixels
    //);
    
  //}

}
setInterval(draw, 30);
