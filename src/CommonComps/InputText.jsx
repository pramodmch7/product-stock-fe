import { Component } from "react";
import "./css/input.css";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { Type, Name, ChangeFunction, Value, Row } = this.props;
    return (
      <>
        <div className="container_input">
          <div className="input-group">
            <textarea
              className="_input"
              type={Type}
              id={`l${Name}`}
              name={Name}
              onChange={ChangeFunction}
              value={Value}
              rows={Row}
              required
            ></textarea>
            <label htmlFor={`l${Name}`} className="label">
              {Name}
            </label>
          </div>
        </div>
        <div className="_Space"></div>
      </>
    );
  }
}

export default Input;
