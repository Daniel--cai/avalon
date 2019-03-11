import React, { Component } from "react";

import { RouteComponentProps, withRouter } from "react-router-dom";

import Api from "../framework/api";
import "./Form.css";

interface State {
  name: string;
  code: string;
}

interface Props {}

class FormBase extends React.Component<Props & RouteComponentProps, State> {
  state = {
    name: "",
    code: ""
  };

  handleCreate = async () => {
    const data = {};
    const response = await Api.Post("/lobby", data);
    const code = response.data;
    await this.joinGame(code);
  };

  joinGame = async (code: string) => {
    const data = {
      code: code,
      player: {
        name: this.state.name
      }
    };
    const response = await Api.Post("/lobby/join", data);
    console.log("joined game: " + code);
    this.props.history.push(`/lobby/${code}`);
    const connectionId = response.data;
  };

  handleClick = async () => {
    await this.joinGame(this.state.code);
  };
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  };
  isJoinDisabled = () => {
    return this.state.name.trim() === "";
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
              placeholder="Bob Smith"
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
              placeholder="bob@example.com"
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div className="fieldset">
          <button onClick={this.handleClick} disabled={this.isJoinDisabled()}>
            Join
          </button>
          <button onClick={this.handleCreate}>Create</button>
        </div>
      </React.Fragment>
    );
  }
}

export const Form = withRouter(FormBase);
