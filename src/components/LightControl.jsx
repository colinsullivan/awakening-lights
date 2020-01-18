/**
 *  @file       LightControl.jsx
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

import React from "react";
import { connect } from "react-redux";
import { SketchPicker } from "react-color";
import colorjoe from "colorjoe";

import "colorjoe/css/colorjoe.css";

import "./LightControl.scss";

import { fixtureOff, fixtureColor } from "common/actions";

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

    this.handleColorChange = (color, e) => {
      this.props.dispatch(
        fixtureColor({
          ...this.props.fixture,
          color
        })
      );
    };
    this.handleOffClicked = () =>
      this.props.dispatch(fixtureOff(this.props.fixture));

    this.colorPickerRef = React.createRef();
  }

  componentDidMount() {
    this.colorControl = colorjoe.rgb(
      this.colorPickerRef.current,
      this.state.color,
      []
    );
    this.colorControl.on("change", this.handleColorChange);
  }

  render() {
    return (
      <div className="color-picker-container">
        <div ref={this.colorPickerRef} />
        <div>
          <button
            onClick={this.handleOffClicked}
          >
            off
          </button>
        </div>
      </div>
    );
  }
}

export default connect()(LightControl);
