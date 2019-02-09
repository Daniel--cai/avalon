import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

interface State {
  output: string[];
  websocket: WebSocket;
}

class App extends Component<any, State> {
  constructor(props: any) {
    super(props);

    const websocket: WebSocket = new WebSocket(
      process.env.REACT_APP_SERVER_URL
    );

    this.state = {
      output: [],
      websocket: websocket
    };
  }

  componentDidMount() {
    this.state.websocket.onmessage = this.onMessage;
    this.state.websocket.onopen = this.onOpen;
  }

  onMessage = (msg: MessageEvent): any => {
    const date = new Date() + " <== " + msg.data + "\n";
    const output = [...this.state.output, date];
    this.setState({ output: output });
    console.log(msg);
  };

  sendMessage = (msg: any) => {
    const date = new Date() + " <== " + msg.data + "\n";
    const output = [...this.state.output, date];
    this.setState({ output: output });
    this.state.websocket.send(msg);
  };

  onOpen = (msg: Event) => {
    setInterval(() => {
      this.sendMessage("ping");
    }, 1000);
  };

  renderMessage() {
    return this.state.output.map(output => {
      return <p>{output}</p>;
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {this.renderMessage()}
          <p>
            Edit <code>src/App.js</code> and savse to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
