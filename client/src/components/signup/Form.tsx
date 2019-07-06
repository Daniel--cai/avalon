import React, { Component, useState } from "react";

import { RouteComponentProps, withRouter } from "react-router-dom";
import Sockette from "sockette";
import Api from "../../framework/api";
import "./Form.css";
import { useWebsocket } from "../../hooks/useWebsocket";

interface State {
  name: string;
  code: string;
  error: string;
}

interface Props {}

const FormBase = (props: Props & RouteComponentProps) => {
  const [name, setName] = useState("");
  let [code, setCode] = useState("");
  let [error, setError] = useState("");

  async function handleCreate() {
    const data = {};
    const response = await Api.Post("/lobby", data);
    const code = response.data;
    await joinGame(code);
  }

  async function joinGame(code: string) {
    const data = {
      code: code,
      player: name
    };
    try {
      // await this.socketConnect(code);
      // const response = await Api.Post("/lobby/join", data);
      // const code = response.data;
      props.history.push(`/lobby/${code}?name=${name}`);
      // const connectionId = response.data;
    } catch (error) {
      console.log(error);
      debugger;
      setError(error.response);
    }
  }

  async function handleClick() {
    await joinGame(code);
  }
  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.name == "name") setName(event.target.value);
    else if (event.target.name == "code") setCode(event.target.value);
    else console.log("handleChange not handled");
    // this.setState({ ...this.state, [event.target.name]: event.target.value });
  }
  function isJoinDisabled() {
    return name.trim() === "";
  }

  return (
    <div className="row">
      <div className="columns">
        <label>Name</label>

        <input
          name="name"
          className="u-full-width"
          placeholder="Bob Smith"
          value={name}
          onChange={handleChange}
          type="text"
        />
        <div className="row">
          <label>Code</label>
          <input
            name="code"
            type="text"
            className="u-full-width"
            value={code}
            maxLength={4}
            placeholder="bob@example.com"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="fieldset">
        {code === "" && (
          <button
            onClick={handleCreate}
            className="button-primary u-full-width"
          >
            Create
          </button>
        )}
        {code !== "" && (
          <button
            className="button-primary u-full-width "
            onClick={handleClick}
            disabled={isJoinDisabled()}
          >
            Join
          </button>
        )}
      </div>
      <div className="error">{error}</div>
    </div>
  );
};

export const Form = withRouter(FormBase);
