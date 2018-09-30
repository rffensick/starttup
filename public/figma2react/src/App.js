import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    data: []
  };

  async componentDidMount() {
    const data = await fetch("http://localhost:3000");

    const json = await data.json();

    this.setState({
      data: json.result
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.state.data.map(item => (
            <div>
              <input type="text" placeholder={item.inputText} style={item.styled} />
            </div>
          ))}
        </p>
      </div>
    );
  }
}

export default App;
