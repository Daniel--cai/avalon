import React, { Component } from "react";
import { Form } from "./Form";
interface State {
  name: string;
  code: string;
}

export class Signup extends Component<any, State> {
  state = {
    name: "",
    code: ""
  };
  render() {
    return (
      <div id="signup">
        <div className="form-wrapper">
          <p className="form-header">Enter a new game</p>
          <Form />
        </div>
      </div>
    );
  }
}
