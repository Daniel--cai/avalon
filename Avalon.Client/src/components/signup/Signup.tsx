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
      <div id="signup" className="row">
        <div className="">
          <h4>Enter a new game</h4>
          <Form />
        </div>
      </div>
    );
  }
}
