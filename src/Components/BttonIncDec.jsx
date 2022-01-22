import React, { Component } from "react";
import { IconButton } from "@material-ui/core";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import {
  deepOrange,
  green,
  grey,
  lightGreen,
  orange,
  purple,
  red,
  teal,
  yellow,
} from "@material-ui/core/colors";

const classes = {
  textRow: {
    display: "flex",
  },
  newIcon: {
    backgroundColor: teal[100],
    color: deepOrange[900],
    // border: `1px solid ${teal[900]}`,
    borderRadius: "20px",
    fontWeight: 700,
  },
  btnChipM: {
    padding: 1,
    color: red[700],
    PointerEvent: "auto",
  },
  btnChipP: {
    padding: 1,
    color: green[700],
    PointerEvent: "auto",
  },
  btnChip: {
    padding: 1,
    PointerEvent: "auto",
  },
  btnRow: {
    display: "flex",
    // backgroundColor: teal[100],
    justifyContent: "space-between",
    border: `0.1px solid ${grey[600]}`,
    borderRadius: "50px",
    width: "90px",
  },
  btninput: {
    width: "33px",
    display: "inline-block",
    border: "0px",
    textAlign: "center",
  },
};

export class ButtonIncDec extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prData: [],
      defultData: {},
      availableQty: null,
    };
  }

  componentDidMount() {
    const defultData = {};
    defultData[this.props.data.id] = this.props.currentNRPQ
      ? parseInt(this.props.currentNRPQ)
      : 1;

    this.setState({ defultData, availableQty: this.props.data.RPQ - 1 });
  }

  changeReqQty = (e) => {
    const defultData = {};
    defultData[e.target.name] = parseInt(e.target.value);
    this.setState({ defultData });
  };

  incrimentReqQty = (e, id) => {
    this.setState((prev) => {
      let selected = (this.state.defultData[id] = prev.defultData[id] + 1);
      return selected;
    });
  };

  decrimentReqQty = (e, id) => {
    this.setState((prev) => {
      let selected = (this.state.defultData[id] = prev.defultData[id] - 1);
      return selected;
    });
  };

  render() {
    return (
      <>
        {this.props.Where === "IDBTN" ? (
          <span>
            <div style={classes.btnRow}>
              <span className="Pr-Chip-">
                <div className="Pr-Chip-Btn" id={this.props.data.id}>
                  <IconButton
                    style={
                      this.state.defultData[this.props.data.id] <= 1
                        ? classes.btnChip
                        : classes.btnChipM
                    }
                    onClick={(e) => this.decrimentReqQty(e, this.props.data.id)}
                    disabled={
                      this.state.defultData[this.props.data.id] <= 1
                        ? true
                        : false
                    }
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </div>
              </span>
              <div
                style={{
                  display: "flex",
                  width: "20%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <input
                  name={this.props.data.RPN}
                  id={this.props.InputID}
                  type="number"
                  max={this.props.data.RPQ}
                  min={1}
                  style={classes.btninput}
                  value={this.state.defultData[this.props.data.id]}
                  onChange={(e) => this.changeReqQty(e)}
                />
              </div>
              <span className="Pr-Chip-">
                <div className="Pr-Chip-Btn" id={this.props.data.id}>
                  <IconButton
                    id={"Name"}
                    style={
                      this.state.defultData[this.props.data.id] >=
                      this.props.data.RPQ
                        ? classes.btnChip
                        : classes.btnChipP
                    }
                    onClick={(e) => this.incrimentReqQty(e, this.props.data.id)}
                    disabled={
                      this.state.defultData[this.props.data.id] >=
                      this.props.data.RPQ
                        ? true
                        : false
                    }
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                </div>
              </span>
            </div>
          </span>
        ) : (
          <span></span>
        )}
      </>
    );
  }
}

export default ButtonIncDec;
