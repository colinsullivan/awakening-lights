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

    var ws = new WebSocket(`ws://${window.location.hostname}:8080`);
    this.ws = ws;
    ws.onerror = () => console.log('WebSocket error');
    ws.onopen = () => console.log('WebSocket connection established');
    ws.onclose = () => console.log('WebSocket connection closed');

  }
  handleColorChange (color, e) {
    this.ws.send(JSON.stringify({
      color: color
    }));
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
