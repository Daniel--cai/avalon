import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { Signup } from "./components/signup";

import { GameView } from "./pages/game-view";
import { EventHelper } from "./pages/event-helper";
import "./App.css";
import { Header } from "./components/header";

export const App = () => {
  return (
    <Router>
      <div className="app ">
        <Header />
        <div className="container">
          <div className="row">
            <Route exact path="/" component={Signup} />
            <Route exact path="/lobby" component={GameView} />
            <Route exact path="/test" component={EventHelper} />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
