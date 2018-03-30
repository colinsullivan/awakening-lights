import { combineReducers } from 'redux'

function pixels (state = [], action) {
  var i, j;
  switch (action.type) {
    case 'off':
      for (i = 0; i < state.length; i++) {
        for (j = 0; j < 3; j++) {
          state[i][j] = 0;
        }
      }
      break;

    case 'color':
      let rgb = action.payload.color.rgb
      for (i = 0; i < state.length; i++) {
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
