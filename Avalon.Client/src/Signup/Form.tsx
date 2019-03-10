import React, { Component } from "react";
import Signup from "./signup";
import axios from "axios";
import Api from "../framework/api";

interface State {
  name: string;
  code: string;
}

class Form extends React.Component<any, State> {
  state = {
    name: "",
    code: ""
  };

  handleClick = async () => {
    const data = {
      code: this.state.code,
      player: {
        name: this.state.name
      }
    };
    const response = await Api.Post("/lobby/join", data);
    const connectionId = response.data;
  };
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  };
  render() {
    return (
      <React.Fragment>
        <div className="fieldset">
          <label>
            <span>Name</span>
            <input
              name="name"
              className="field"
              placeholder="Jenny Rosen"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <span>Code</span>
            <input
              name="code"
              type="Code"
              className="field"
              value={this.state.code}
              placeholder="jenny@example.com"
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div className="fieldset">
          <button onClick={this.handleClick} disabled>
            Join
          </button>
          <button>Create</button>
        </div>
      </React.Fragment>
    );
  }
}

export default Form;
