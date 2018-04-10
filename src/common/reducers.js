import { combineReducers } from 'redux'

function pixels (state = [], action) {
  var i, j;
  let startPixel, endPixel;
  if (action.payload && action.payload.startPixel) {
    startPixel = action.payload.startPixel;
  } else {
    startPixel = 0;
  }

  if (action.payload && action.payload.endPixel) {
    endPixel = action.payload.endPixel;
  } else {
    endPixel = state.length - 1;
  }
  switch (action.type) {
    case 'INIT_STATE':
      state = [...action.payload.pixels];
      break;
    case 'off':
      for (i = startPixel; i <= endPixel; i++) {
        for (j = 0; j < 3; j++) {
          state[i][j] = 0;
        }
      }
      break;

    case 'color':
      let rgb = action.payload.color.rgb
      for (i = startPixel; i <= endPixel; i++) {
        state[i][0] = rgb.g;
        state[i][1] = rgb.r;
        state[i][2] = rgb.b;
      }
      break;
    
    default:
      break;
  }
  return state;
}

export default combineReducers({
  pixels  
})
