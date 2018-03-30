export function create_pixels (numPixels) {
  var actual_pixels = new Array(numPixels);
  let i;
  for (i = 0; i < numPixels; i++) {
    actual_pixels[i] = [0, 0, 0];
  }
  return actual_pixels;
}
