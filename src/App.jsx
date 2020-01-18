import React, { Component } from 'react';
import { connect } from 'react-redux';
//import 'bootstrap';
//import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import LightControl from 'components/LightControl.jsx';
import { READY_STATES } from './common/constants';

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
    console.log("this.props.fixtures");
    console.log(this.props.fixtures);
    if (this.props.websocketReadyState === READY_STATES.OPEN) {
      return (
        <div className="light-control-container">
          {Object.keys(this.props.fixtures).map(id => 
            <LightControl fixture={this.props.fixtures[id]} />
          )}
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="row">
            <div className="col">
							<div className="card bg-light mt-3">
								<div className="card-header">Loading..</div>
								<div className="card-body">
									<h5 className="card-title">Connecting to {window.location.host}...</h5>
									<p className="card-text"></p>
								</div>
							</div>
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    websocketReadyState: state.websocketReadyState,
    fixtures: state.fixtures
  };
};

export default connect(mapStateToProps)(App);
