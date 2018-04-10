/**
 *  @file       LightControl.jsx
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

import React from 'react';
import { SketchPicker } from 'react-color';

class LightControl extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: {
        hex: "#000000"
      }
    };
  }

  handleColorChange = (color, e) => {
    this.props.dispatch({
      type: 'color',
      payload: {
        color: color,
        startPixel: this.props.startPixel,
        endPixel: this.props.endPixel
      }
    });
  }
  handleOffClicked = () => {
    this.props.dispatch({
      type: 'off',
      payload: {
        startPixel: this.props.startPixel,
        endPixel: this.props.endPixel
      }
    });
  }

  render () {
    return (
      <div className="row">
        <div className="col-4">
          <SketchPicker
            color={this.state.color}
            onChange={ this.handleColorChange }
            disableAlpha={true}
          />
        </div>
        <div className="col-2">
          <button type="button" className="btn btn-primary" onClick={this.handleOffClicked}>off</button>
        </div>
      </div>
    );
  }
}

export default LightControl;
