import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getAllRawProduct } from "../../Data/ProductsData";
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Divider,
  TextField,
  Button,
  Icon,
  Chip,
  ButtonGroup,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  deepOrange,
  green,
  lightGreen,
  orange,
  purple,
  red,
  teal,
  yellow,
} from "@material-ui/core/colors";
import RPPiChart from "../Charts/RPCharts/RPPiChart";

const OwnStyles = makeStyles((theam) => ({
  successBtn: {
    borderColor: theam.palette.success.dark,
    color: theam.palette.success.dark,
  },
  errorBtn: {
    borderColor: theam.palette.error.dark,
    color: theam.palette.error.dark,
  },
  infoBtn: {
    borderColor: theam.palette.info.dark,
    color: theam.palette.info.dark,
  },
  ClipCount: {
    color: "#fff",
    fontSize: theam.typography.caption.fontSize,
    backgroundColor: theam.palette.info.main,
    paddingLeft: 1,
  },
  textRow: {
    display: "flex",
  },
  infoChip: {
    backgroundColor: teal[100],
    color: teal[900],
    border: `1px solid ${teal[900]}`,
    fontWeight: 700,
  },
}));

let api = axios.create({
  baseURL: `/`,
});

export default function RPViewAEM() {
  const classes = OwnStyles();
  let InnerWidth = () => window.innerWidth;
  const [checkWidth, setCheckWidth] = useState(InnerWidth);
  const [enteredData, setEnteredData] = useState({
    RPN: "",
    RPD: "",
    RPQ: "",
    RPP: "",
    RPW: "",
  });

  function getEnteredData(e) {
    let Name = e.target.name;
    let Value = e.target.value;
    setEnteredData((prevState) => ({
      ...prevState,
      [Name]: Value,
    }));
  }

  const [rProduct, setRProduct] = useState([]);

  const getRPData = async () => {
    let da = await getAllRawProduct().then((data) => data);

    setRProduct(da.message);
  };

  const { state } = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    getRPData();

    const Data = state.Data.data;
    setEnteredData({
      RPN: Data["RPN"],
      RPD: Data["RPD"],
      RPQ: Data["RPQ"],
      RPP: Data["RPP"],
      RPW: Data["RPW"],
      id: Data["id"],
    });
    return () => {
      console.log("Cleaned Up!");
    };
  }, []);

  const reset = () => {
    setEnteredData({
      RPN: "",
      RPD: "",
      RPQ: "",
      RPP: "",
      RPW: "",
    });
  };

  const createRawProduct = async () => {
    const response = await api.post(`anrp`, enteredData);

    if (response.data.code.split("|")[0] === "Recover") {
      const btn = document.createElement("button");
      // btn.setAttribute("textContext", "Recover");
      btn.textContent = "Recover";
      const dun = recoverRawProduct;
      btn.addEventListener("click", function () {
        dun(response.data.code.split("|")[1]);
        // this.recoverRawProductTest(response.data.code.split("|")[1]);
      });
      document.querySelector("#btns").appendChild(btn);
    }
    getRPData();
    toast.success("Raw Product Created in the system!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      delay: 500,
      transition: Slide,
    });
    reset();
  };

  const updateRawProduct = async () => {
    await api.put(`urp/${enteredData["id"]}`, enteredData);
    getRPData();
    // setEditID(editID);
    // reset();
    // this.setState({
    //   enteredData: { Id: "", RPN: "", RPD: "", RPQ: "", RPP: "", RPW: "" },
    //   editID: "",
    // });
    toast.info("Changes has been made to Raw Product", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Slide,
    });
    // setTimeout(() => {
    //   navigate("/supp");
    // }, 1600);

    const Element = document.querySelector(".Toastify");
    const config = { childList: true, attributes: true };
    const callBack = (ML, OB) => {
      for (const m of ML) {
        if (m.type === "childList" && m.addedNodes.length === 0) {
          navigate("/rp");
        }
      }
    };
    const Obser = new MutationObserver(callBack);

    Obser.observe(Element, config);
  };

  const recoverRawProduct = async (_id) => {
    await api.put(`rrp/${_id}`);
    getRPData();
    reset();
  };

  const goBackRP = () => navigate("/rp");

  window.addEventListener("resize", function () {
    setCheckWidth(InnerWidth);
  });
  return (
    <>
      <Container>
        <div className="CheckHeader">
          <Container>
            <Grid container>
              <Grid item xs={12} lg={5} md={5} xl={5} sm={7}>
                <Box>
                  <Paper>
                    <Box
                      className={classes.textRow}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="h5" component={"h6"}>
                        {state.Data["info"][0]}
                      </Typography>
                      {!state.Data["info"][3] ? (
                        <Chip
                          className={classes.infoChip}
                          label={`View: ${rProduct.length}`}
                          size="small"
                          clickable={true}
                          onClick={goBackRP}
                          variant="outlined"
                        />
                      ) : (
                        <Chip
                          className={classes.infoChip}
                          label={`Edit for: ${enteredData["RPN"]}`}
                          size="small"
                          clickable={true}
                          onClick={goBackRP}
                          variant="outlined"
                        />
                      )}
                    </Box>
                    <Box>
                      <Typography variant="body2" component={"p"}>
                        {state.Data["info"][1]}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box>
                      <TextField
                        id="outlined-basic"
                        label="Name"
                        required
                        autoComplete="off"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        name="RPN"
                        value={enteredData["RPN"]}
                        onChange={getEnteredData}
                        size="medium"
                      />
                      <TextField
                        id="outlined-basic"
                        label="Description"
                        required
                        autoComplete="off"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        name="RPD"
                        value={enteredData["RPD"]}
                        onChange={getEnteredData}
                      />
                      <TextField
                        id="outlined-basic"
                        label="Quantity"
                        required
                        autoComplete="off"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        name="RPQ"
                        type="number"
                        value={enteredData["RPQ"]}
                        onChange={getEnteredData}
                      />
                      <TextField
                        id="outlined-basic"
                        label="Price"
                        required
                        autoComplete="off"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        name="RPP"
                        type="number"
                        value={enteredData["RPP"]}
                        onChange={getEnteredData}
                      />
                      <TextField
                        id="outlined-basic"
                        label="Weight"
                        required
                        autoComplete="off"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        name="RPW"
                        type="text"
                        value={enteredData["RPW"]}
                        onChange={getEnteredData}
                      />
                    </Box>

                    {!state.Data["info"][3] ? (
                      <Box
                        className={classes.textRow}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Button
                          className={classes.successBtn}
                          variant="outlined"
                          size="medium"
                          variant="outlined"
                          startIcon={<AddIcon />}
                          type="submit"
                          onClick={createRawProduct}
                        >
                          Create Raw Product
                        </Button>
                        <Button
                          className={classes.errorBtn}
                          variant="outlined"
                          size="medium"
                          variant="outlined"
                          startIcon={<RotateLeftIcon />}
                          onClick={reset}
                        >
                          Reset
                        </Button>
                      </Box>
                    ) : (
                      <Box
                        className={classes.textRow}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Button
                          className={classes.infoBtn}
                          variant="outlined"
                          size="medium"
                          variant="outlined"
                          startIcon={<AddIcon />}
                          type="submit"
                          onClick={updateRawProduct}
                        >
                          Update Raw Product
                        </Button>
                      </Box>
                    )}
                  </Paper>
                </Box>
              </Grid>
              {checkWidth > 768 && (
                <>
                  <Grid item xs={0} lg={2} md={1} xl={2} sm={0}></Grid>
                  <Grid item xs={12} lg={5} md={6} xl={5} sm={7}>
                    <RPPiChart />
                  </Grid>
                </>
              )}
            </Grid>
          </Container>
        </div>
      </Container>

      <ToastContainer />
    </>
  );
}
