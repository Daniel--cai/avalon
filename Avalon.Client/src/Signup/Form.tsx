import * as React from "react";
import Signup from "./Signup";

interface State {
  name: string;
  code: string;
}

class Form extends React.Component<any, State> {
  state = {
    name: "",
    code: ""
  };
  render() {
    return (
      <React.Fragment>
        <div className="fieldset">
          <label>
            <span>Name</span>
            <input name="name" className="field" placeholder="Jenny Rosen" />
          </label>
          <label>
            <span>Code</span>
            <input
              name="email"
              type="Code"
              className="field"
              placeholder="jenny@example.com"
            />
          </label>
        </div>
        <div className="fieldset">
          <button>Join</button>
          <button>Create</button>
        </div>
      </React.Fragment>
    );
  }
}

export default Form;
