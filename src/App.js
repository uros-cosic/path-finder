import React from "react";
import "./App.css";

import Legend from "./components/Legend";
import Table from "./components/Table";
import Navbar from "./components/Navbar";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      algorithm: "", // Algorithm used for path finder
    };
    this.setAlgorithm = this.setAlgorithm.bind(this);
  }

  setAlgorithm(alg) {
    /* Set the state algorithm to alg */
    this.setState({
      algorithm: alg,
    });
  }

  render() {
    return (
      <div className="App">
        <Navbar setSpeed={this.setSpeed} setAlgorithm={this.setAlgorithm} />
        <Legend algorithm={this.state.algorithm} />
        <Table algorithm={this.state.algorithm} />
      </div>
    );
  }
}

export default App;
