import React, { Component } from 'react';
import './App.css';
import { SketchPicker } from 'react-color';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';


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
  dispatch (action) {
    this.ws.send(JSON.stringify(action));
  }
  handleColorChange = (color, e) => {
    this.dispatch({
      type: 'color',
      payload: {
        color: color
      }
    });
  }
  handleOffClicked = () => {
    this.dispatch({
      type: 'off'
    });
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <SketchPicker
            color={this.state.color}
            onChange={ this.handleColorChange }
          />
        </div>
        <div className="row">
          <button type="button" className="btn btn-primary" onClick={this.handleOffClicked}>off</button>
        </div>
      </div>
    );
  }
}

export default App;
