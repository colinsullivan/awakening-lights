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
import { connect } from 'react-redux';
import { SketchPicker } from 'react-color';

/**
 *  @class        LightControl
 *
 *  @classdesc    Single color control component.
 **/
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
        <div className="col-xs-12 col-md-3">
          <SketchPicker
            color={this.state.color}
            onChange={ this.handleColorChange }
            disableAlpha={true}
          />
        </div>
        <div className="col-xs-12 col-md-1">
          <button type="button" className="btn btn-primary" onClick={this.handleOffClicked}>off</button>
        </div>
      </div>
    );
  }
}

export default connect()(LightControl);
