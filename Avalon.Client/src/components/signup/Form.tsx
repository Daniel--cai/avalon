import React, { Component } from "react";

import { RouteComponentProps, withRouter } from "react-router-dom";

import Api from "../../framework/api";
import "./Form.css";

interface State {
  name: string;
  code: string;
  error: string;
}

interface Props {}

class FormBase extends React.Component<Props & RouteComponentProps, State> {
  state = {
    name: "",
    code: "",
    error: ""
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
      player: this.state.name
    };
    try {
      const response = await Api.Post("/lobby/join", data);
      const code = response.data;
      this.props.history.push(`/lobby/${code}`);
      const connectionId = response.data;
    } catch (error) {
      this.setState({ error: error.response.data });
    }
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
      <>
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
              maxLength={4}
              placeholder="bob@example.com"
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div className="fieldset">
          {this.state.code === "" && (
            <button onClick={this.handleCreate}>Create</button>
          )}
          {this.state.code !== "" && (
            <button onClick={this.handleClick} disabled={this.isJoinDisabled()}>
              Join
            </button>
          )}
        </div>
        <div>{this.state.error}</div>
      </>
    );
  }
}

export const Form = withRouter(FormBase);
