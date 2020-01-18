import onecolor from "onecolor";

export function create_pixels (numPixels) {
  var actual_pixels = new Array(numPixels);
  let i;
  for (i = 0; i < numPixels; i++) {
    actual_pixels[i] = [0, 0, 0];
  }
  return actual_pixels;
}

export function create_fixture (id, startPixel, endPixel) {
  return {
    id,
    startPixel,
    endPixel,
    color: onecolor("#000000")
  };
}

export function colorPixelRange (state, { startPixel, endPixel, color }) {
  let i;
  for (i = startPixel; i <= endPixel; i++) {
    state[i][0] = color.green() * 255;
    state[i][1] = color.red() * 255;
    state[i][2] = color.blue() * 255;
  }
  return state;
}

export function offPixelRange (state, { startPixel, endPixel }) {
  let i, j;
  for (i = startPixel; i <= endPixel; i++) {
    for (j = 0; j < 3; j++) {
      state[i][j] = 0;
    }
  }
  return state;
}
