import React, { Component } from "react";
import Form from "./Form";
import "./form.css";
interface State {
  name: string;
  code: string;
}

class Signup extends Component<any, State> {
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

export default Signup;
