import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import LightControl from './LightControl.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: {
        hex: "#FFFFFF"
      }
    };

  }
  
  render() {
    return (
      <div className="container-fluid">
        <LightControl startPixel={0} endPixel={49} />
        <LightControl startPixel={50} endPixel={61} />
      </div>
    );
  }
}

export default connect()(App);
