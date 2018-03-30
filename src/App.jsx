import React, { Component } from 'react';
import { SketchPicker } from 'react-color';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import RangeTester from './RangeTester.jsx';


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
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 offset-10">
            <button type="button" className="btn btn-primary" onClick={this.handleOffClicked}>off</button>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <SketchPicker
              color={this.state.color}
              onChange={ this.handleColorChange }
              disableAlpha={true}
            />
          </div>
          <div className="col-4">
            <RangeTester />
          </div>
          <div className="col-4"></div>
        </div>
      </div>
    );
  }
}

export default App;
