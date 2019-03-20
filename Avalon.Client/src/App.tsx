import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { Signup } from "./components/signup";

import { Lobby } from "./lobby";
import { GameScreen } from "./pages/game-screen";

interface State {
  output: string[];
  websocket: WebSocket;
}

class App extends Component<any, State> {
  constructor(props: any) {
    super(props);

    // const websocket: WebSocket = new WebSocket(
    //   process.env.REACT_APP_SERVER_URL
    // );

    // this.state = {
    //   output: [],
    //   websocket: websocket
    // };
  }

  // componentDidMount() {
  //   this.state.websocket.onmessage = this.onMessage;
  //   this.state.websocket.onopen = this.onOpen;
  // }

  // onMessage = (msg: MessageEvent): any => {
  //   const date = new Date() + " <== " + msg.data + "\n";
  //   const output = [...this.state.output, date];
  //   this.setState({ output: output });
  //   console.log(msg);
  // };

  // sendMessage = (msg: any) => {
  //   const date = new Date() + " <== " + msg.data + "\n";
  //   const output = [...this.state.output, date];
  //   this.setState({ output: output });
  //   this.state.websocket.send(msg);
  // };

  // onOpen = (msg: Event) => {
  //   setInterval(() => {
  //     this.sendMessage("ping");
  //   }, 1000);
  // };

  // renderMessage() {
  //   return this.state.output.map(output => {
  //     return <p>{output}</p>;
  //   });
  // }

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Signup} />
          <Route exact path="/lobby/:code" component={Lobby} />
          <Route exact path="/game/:code" component={GameScreen} />
        </div>
      </Router>
    );
  }
}

export default App;
