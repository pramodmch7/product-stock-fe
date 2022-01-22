import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getAllRawProduct, getAllFinalProduct } from "../../Data/ProductsData";
import {
  Box,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import DoneIcon from "@material-ui/icons/Done";
import Cancel from "@material-ui/icons/Cancel";
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
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import ButtonIncDec from "../BttonIncDec";

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
  newIcon: {
    backgroundColor: teal[100],
    color: deepOrange[900],

    borderRadius: "20px",
    fontWeight: 700,
  },
  btnChip: {
    padding: 5,
  },
  btnRow: {
    width: "100px",
  },
  btninput: {
    width: "33px",
    display: "inline-block",
    border: "0px",
  },
  icon: {
    "&.MuiChip-deleteIcon": {
      color: red["A700"],
    },
  },
  iconS: {
    "&.MuiChip-deleteIcon": {
      color: green["A700"],
    },
  },
  iconGreen: {
    backgroundColor: green[100],
    color: grey[900],
    fontWeight: 900,
  },
  iconOrange: {
    backgroundColor: orange[500],
    color: "white",
    fontWeight: 900,
  },
  iconGreenOut: {
    borderColor: green[500],
    fontWeight: 900,
  },
  iconOrangeOut: {
    borderColor: orange[500],
    fontWeight: 900,
  },
  iconRedOut: {
    borderColor: red[500],
    fontWeight: 900,
  },
  paddingZero: {
    padding: 0,
  },
}));

const ownTheam = createTheme({
  // palette: {
  //   type: "dark",
  // },
});

let api = axios.create({
  baseURL: `/`,
});

export default function FProductAEM() {
  const classes = OwnStyles();
  let InnerWidth = () => window.innerWidth;
  const [checkWidth, setCheckWidth] = useState(InnerWidth);
  const [enteredData, setEnteredData] = useState({
    FPN: "",
    FPD: "",
  });
  const [fProduct, setFProduct] = useState([]);
  const [rProduct, setRProduct] = useState([]);
  const [zeroRawProduct, setZeroRawProduct] = useState([]);

  let checkLength = () => {
    if (rProduct.length >= 1 && zeroRawProduct.length >= 1) {
      return true;
    } else {
      return false;
    }
  };

  function getEnteredData(e) {
    let Name = e.target.name;
    let Value = e.target.value;
    setEnteredData((prevState) => ({
      ...prevState,
      [Name]: Value,
    }));
  }

  const getRPData = async () => {
    let da = await getAllRawProduct().then((data) => data);

    const RPProductsC = [];
    const RPProductsZ = [];
    da.message.forEach((data) => {
      if (!data["RPQ"] <= 0) {
        RPProductsC.push(data);
      } else {
        RPProductsZ.push(data);
      }
    });
    setRProduct(RPProductsC);
    setZeroRawProduct(RPProductsZ);
  };

  const getFPData = async () => {
    let da = await getAllFinalProduct().then((data) => data);
    console.log(da);
    setFProduct(da.message);
  };

  const changeRawProductQty = (data, SelData) => {
    let qty = document.querySelectorAll("#QtyValue");

    qty.forEach((da, dda) => {
      if (data["RPN"] == da["name"]) {
        SelData["NRPQ"] = da.value;

        return SelData;
      }
    });
  };

  const [selectedProduct, setSelectedProduct] = useState([]);

  const onCheckedItem = (a, data) => {
    console.log(data);
    console.log(data["RPQ"] >= 1);

    let selData = rProduct.filter((obj) => obj.id === data.id);
    let newData = rProduct.filter((obj) => obj.id !== data.id);
    let values = changeRawProductQty(data, selData[0]);
    // console.log(selData[0]);

    setRProduct(newData);
    setSelectedProduct([...selectedProduct, selData[0]]);

    // }
  };

  const deleteSelProduct = (b, data) => {
    let selData = selectedProduct.filter((obj) => obj.id === data.id);
    let newData = selectedProduct.filter((obj) => obj.id !== data.id);

    let changeData = rProduct;

    changeData.push(selData[0]);
    setRProduct(changeData);
    setSelectedProduct(newData);
  };

  const { state } = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    getRPData();
    getFPData();
    return () => {
      console.log("Cleaned Up!");
    };
  }, []);

  const reset = () => {
    setEnteredData({
      FPN: "",
      FPD: "",
    });
    getRPData();
    setSelectedProduct([]);
  };

  const createProduct = async () => {
    let newData = {
      FPN: enteredData["FPN"],
      FPD: enteredData["FPD"],
      FRM: selectedProduct,
    };

    const response = await api.post(`anfp`, newData);

    if (response.data.code.split("|")[0] === "Recover") {
      const btn = document.createElement("button");

      btn.textContent = "Recover";
      const dun = recoverRawProduct;
      btn.addEventListener("click", function () {
        dun(response.data.code.split("|")[1]);
      });
      document.querySelector("#btns").appendChild(btn);
    }
    getRPData();
    toast.success("Final Product Created in the system!", {
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
    getFPData();
  };

  const updateRawProduct = async () => {
    await api.put(`urp/${enteredData["id"]}`, enteredData);
    getRPData();

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
    getFPData();
  };

  const recoverRawProduct = async (_id) => {
    await api.put(`rrp/${_id}`);
    getRPData();
    reset();
  };

  const goBack = () => navigate("/fp");

  window.addEventListener("resize", function () {
    setCheckWidth(InnerWidth);
  });

  return (
    <>
      <ThemeProvider theme={ownTheam}>
        <Box
          component={checkWidth > 500 ? Container : ""}
          style={
            checkWidth > 1280
              ? { maxWidth: "50%" }
              : checkWidth > 960
              ? { maxWidth: "70%" }
              : { maxWidth: "100%" }
          }
        >
          <div className="CheckHeader">
            <Box component={checkWidth > 500 ? Container : ""}>
              <Grid container>
                <Grid item xs={12} lg={12} md={12} xl={12} sm={12}>
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
                            label={`View: ${fProduct.length}`}
                            size="small"
                            clickable={true}
                            onClick={goBack}
                            variant="outlined"
                          />
                        ) : (
                          <Chip
                            className={classes.infoChip}
                            label={`Edit for: ${enteredData["FPN"]}`}
                            size="small"
                            clickable={true}
                            onClick={goBack}
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
                          name="FPN"
                          value={enteredData["FPN"]}
                          onChange={getEnteredData}
                        />
                        <TextField
                          id="outlined-basic"
                          label="Description"
                          required
                          autoComplete="off"
                          variant="outlined"
                          fullWidth
                          margin="dense"
                          name="FPD"
                          value={enteredData["FPD"]}
                          onChange={getEnteredData}
                        />
                      </Box>
                      <Box style={{ userSelect: "none" }}>
                        <Grid container>
                          <Grid item xs={12} lg={6} md={12} xl={6} sm={12}>
                            <Box
                              style={{ maxHeight: "30vh", overflow: "scroll" }}
                            >
                              <Chip
                                label={selectedProduct.length}
                                size="small"
                                style={{ float: "right", marginRight: 10 }}
                              />
                              {selectedProduct.length >= 1 && (
                                <TableContainer component={Paper}>
                                  <Table padding="checkbox">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell align="center">#</TableCell>
                                        <TableCell align="center">
                                          Name
                                        </TableCell>
                                        <TableCell align="center">
                                          Sel Qty
                                        </TableCell>

                                        <TableCell align="center">
                                          Price
                                        </TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {selectedProduct.map((sp, spI) => (
                                        <TableRow key={sp["id"]}>
                                          {console.log(sp)}
                                          <TableCell>{spI + 1}</TableCell>
                                          <TableCell>
                                            <Chip
                                              className={classes.iconOrangeOut}
                                              label={sp.RPN}
                                              variant="outline"
                                              clickable
                                              onDelete={(e) =>
                                                deleteSelProduct(e, sp)
                                              }
                                              deleteIcon={
                                                <Cancel
                                                  className={classes.icon}
                                                />
                                              }
                                            />
                                          </TableCell>
                                          <TableCell align="center">
                                            <Chip
                                              label={`${sp["NRPQ"]}`}
                                              className={classes.iconOrangeOut}
                                              variant="outline"
                                              size="small"
                                            />
                                          </TableCell>

                                          <TableCell align="center">
                                            <Chip
                                              label={sp["NRPQ"] * sp["RPP"]}
                                              className={classes.iconOrangeOut}
                                              variant="outline"
                                              size="small"
                                            />
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              )}
                            </Box>
                          </Grid>

                          <Box style={{ height: "10px" }}></Box>

                          {rProduct.length >= 1 && (
                            <Grid item xs={12} lg={6} md={12} xl={6} sm={12}>
                              <Box
                                style={{
                                  maxHeight: "30vh",
                                  overflow: "scroll",
                                }}
                              >
                                <TableContainer component={Paper} style={{}}>
                                  <Table padding="checkbox">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell align="center">
                                          Name
                                        </TableCell>
                                        <TableCell align="center">
                                          Req Qty
                                        </TableCell>
                                        <TableCell align="center">
                                          Ava Qty
                                        </TableCell>
                                        <TableCell align="center">
                                          Price
                                        </TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {rProduct.map((rp, rpI) => (
                                        <TableRow key={rp["id"]}>
                                          <TableCell>
                                            <Chip
                                              className={classes.iconGreenOut}
                                              elevation={1}
                                              label={rp.RPN}
                                              variant="outline"
                                              clickable
                                              onDelete={(e) =>
                                                onCheckedItem(e, rp)
                                              }
                                              deleteIcon={
                                                <CheckCircleOutlineIcon
                                                  className={classes.iconS}
                                                />
                                              }
                                            />
                                          </TableCell>
                                          <TableCell align="center">
                                            <ButtonIncDec
                                              data={rp}
                                              currentNRPQ={1}
                                              Where="IDBTN"
                                              InputID="QtyValue"
                                            />
                                          </TableCell>
                                          <TableCell align="center">
                                            <Chip
                                              className={classes.iconGreenOut}
                                              label={rp.RPQ}
                                              size="small"
                                              variant="outline"
                                            />
                                          </TableCell>
                                          <TableCell align="center">
                                            <Chip
                                              className={classes.iconGreenOut}
                                              label={rp.RPP}
                                              size="small"
                                              variant="outline"
                                            />
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                      {zeroRawProduct.length >= 1 &&
                                        zeroRawProduct.map((zp, zpI) => (
                                          <>
                                            <Divider />
                                            <TableRow key={zp["id"]}>
                                              <TableCell>
                                                <Chip
                                                  elevation={1}
                                                  label={zp.RPN}
                                                  variant="outline"
                                                  clickable={false}
                                                  disabled={true}
                                                  className={classes.iconRedOut}
                                                />
                                              </TableCell>
                                              <TableCell align="center"></TableCell>
                                              <TableCell align="center">
                                                <Chip
                                                  className={classes.iconRedOut}
                                                  label={zp.RPQ}
                                                  size="small"
                                                  clickable={false}
                                                  disabled={true}
                                                  variant="outline"
                                                />
                                              </TableCell>
                                              <TableCell align="center">
                                                <Chip
                                                  className={classes.iconRedOut}
                                                  label={zp.RPP}
                                                  size="small"
                                                  clickable={false}
                                                  disabled={true}
                                                  variant="outline"
                                                />
                                              </TableCell>
                                            </TableRow>
                                          </>
                                        ))}
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              </Box>
                            </Grid>
                          )}
                        </Grid>
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
                            onClick={createProduct}
                          >
                            Add Final Product
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
                            {state.Data["info"][2]}
                          </Button>
                        </Box>
                      )}
                    </Paper>
                  </Box>
                </Grid>
                {checkWidth > 768 && (
                  <>
                    <Grid item xs={0} lg={2} md={1} xl={2} sm={0}></Grid>
                    <Grid item xs={12} lg={5} md={6} xl={5} sm={7}></Grid>
                  </>
                )}
              </Grid>
            </Box>
          </div>
        </Box>
      </ThemeProvider>
      <ToastContainer />
    </>
  );
}
