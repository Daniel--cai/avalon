import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { Signup } from "./components/signup";

import { Lobby } from "./lobby";
import { GameScreen } from "./pages/game-screen";
import { EventHelper } from "./pages/event-helper";
import "./App.css";
import { Header } from "./components/header";
import { Provider } from "./state/GameStore";

export const App = (props: any) => {
  return (
    <Router>
      <div className="app ">
        <Provider>
          <Header />
          <div className="container">
            <div className="row">
              <Route exact path="/" component={Signup} />
              <Route exact path="/lobby/:code" component={Lobby} />
              <Route exact path="/game/:code" component={GameScreen} />
              <Route exact path="/test" component={EventHelper} />
            </div>
          </div>
        </Provider>
      </div>
    </Router>
  );
};

export default App;
