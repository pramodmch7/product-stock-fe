import { Component } from "react";
import "./css/input.css";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { Type, Name, ChangeFunction, Value, autoComp, Label, DefaultValue } =
      this.props;
    return (
      <>
        <div className="container_input">
          <div className="input-group">
            <input
              className={"_input _inputHi"}
              type={Type}
              id={`l${Name}`}
              name={Name}
              onChange={ChangeFunction}
              value={Value}
              required
              autoComplete={autoComp}
              defaultValue={DefaultValue}
            />
            <label htmlFor={`l${Name}`} className={"_label"}>
              {Label}
            </label>
          </div>
        </div>
        <div className="_Space"></div>
      </>
    );
  }
}

export default Input;
