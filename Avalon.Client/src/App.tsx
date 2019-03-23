import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { Signup } from "./components/signup";

import { Lobby } from "./lobby";
import { GameScreen } from "./pages/game-screen";

import "./App.css";
import { Header } from "./components/header";

class App extends Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="main-body">
            <Route exact path="/" component={Signup} />
            <Route exact path="/lobby/:code" component={Lobby} />
            <Route exact path="/game/:code" component={GameScreen} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
