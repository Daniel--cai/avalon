import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./styles/normalize.css";
import "./styles/skeleton.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { GameStore } from "./state/GameStore";
import { setGlobal } from "reactn";

const initialState = new GameStore();
setGlobal(initialState);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
