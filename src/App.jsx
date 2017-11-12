import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { SketchPicker } from 'react-color';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: {
        hex: "#FFFFFF"
      }
    };

  }
  handleColorChange (color, e) {
    console.log("color");
    console.log(color);
  }
  render() {
    return (
      <div className="App">
        <SketchPicker
          color={this.state.color}
          onChange={ this.handleColorChange.bind(this) }
        />
      </div>
    );
  }
}

export default App;
