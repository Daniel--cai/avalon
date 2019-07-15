import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { Signup } from "./components/signup";

import { GameView } from "./pages/game-view";
import { EventHelper } from "./pages/event-helper";
import "./App.css";
import { Header } from "./components/header";
import { Provider } from "./state/GameStore";

export const App = () => {
  return (
    <Router>
      <div className="app ">
        <Provider>
          <Header />
          <div className="container">
            <div className="row">
              <Route exact path="/" component={Signup} />
              <Route
                exact
                path="/lobby/:code/name/:name"
                component={GameView}
              />
              <Route exact path="/test" component={EventHelper} />
            </div>
          </div>
        </Provider>
      </div>
    </Router>
  );
};

export default App;
