
var OPC = new require('./opc'),
  client = new OPC('localhost', 7890);

var actual_pixels = [];
const numPixels = 80;
for (i = 0; i < numPixels; i++) {
  actual_pixels.push([0, 0, 0]);
}

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
