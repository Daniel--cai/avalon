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
      <div className="row">
        <div className="columns">
          <label>Name</label>

          <input
            name="name"
            className="u-full-width"
            placeholder="Bob Smith"
            value={this.state.name}
            onChange={this.handleChange}
            type="text"
          />
          <div className="row">
            <label>Code</label>
            <input
              name="code"
              type="text"
              className="u-full-width"
              value={this.state.code}
              maxLength={4}
              placeholder="bob@example.com"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="fieldset">
          {this.state.code === "" && (
            <button
              onClick={this.handleCreate}
              className="button-primary u-full-width"
            >
              Create
            </button>
          )}
          {this.state.code !== "" && (
            <button
              className="button-primary u-full-width "
              onClick={this.handleClick}
              disabled={this.isJoinDisabled()}
            >
              Join
            </button>
          )}
        </div>
        <div className="error">{this.state.error}</div>
      </div>
    );
  }
}

export const Form = withRouter(FormBase);
