import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MaterialTable from "material-table";
import Container from "@material-ui/core/Container";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  deepOrange,
  green,
  orange,
  purple,
  red,
  teal,
  yellow,
} from "@material-ui/core/colors";
import { Box, Button, Chip, Paper, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

import AccountTreeIcon from "@material-ui/icons/AccountTree";

import { FPColumns } from "../../Data/TabelFinalProduct";

import { SRPColumns } from "../../Data/TabelSelectedRawProduct";
import { getAllFinalProduct } from "../../Data/ProductsData";

let api = axios.create({
  baseURL: `/`,
});

const ownStyles = makeStyles({
  ClipCount: {
    color: "#fff",
    fontWeight: 900,
  },
  TableTopRow: {
    display: "flex",
  },
});
const myTheam = createTheme({
  // palette: {
  //   primary: {
  //     main: purple[500],
  //   },
  //   secondary: {
  //     main: "#ff9100",
  //   },
  //   type: "light",
  // },
  palette: {
    primary: yellow,
    secondary: {
      main: "#b71c1c",
    },
    type: "light",
  },
});

function FPView() {
  const classes = ownStyles();
  const [fProduct, setFProduct] = useState([]);
  const [SRDetail, setSRDetail] = useState([]);
  const [loading, setloading] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);

  const getFinalProducts = async () => {
    let da = await getAllFinalProduct().then((data) => data);

    setFProduct(da["message"]);
    setloading(false);
  };

  useEffect(() => {
    getFinalProducts();
    return () => {
      console.log("Cleaning Up");
    };
  }, []);
  const addValies = () => {
    return fProduct.map((RProduct, nums) => {
      const Data = {
        ...RProduct,
        slno: nums + 1,
      };
      return Data;
    });
  };

  const getColumns = () => {
    return window.innerWidth > 768 ? FPColumns.Desk : FPColumns.Mobile;
  };
  const getSRPColumns = () => {
    return window.innerWidth > 768 ? SRPColumns.Desk : SRPColumns.Mobile;
  };

  window.addEventListener("resize", function () {
    getColumns();
  });

  const columns = getColumns();
  const data = addValies();
  const sRPColumns = getSRPColumns();

  const noProduct = () => {
    const Show = document.querySelector(".rt-noData");
    if (Show) {
      Show.innerHTML = "<b>No Product Available</b>";
    }
  };

  const DeleteItems = async (ele, data) => {
    console.log(data);
    let del = window.confirm(
      `Are you Sure you want to delete the Final Product "${data["FPN"]}"`
    );

    if (del) {
      await api.put(`dfp/${data["id"]}`, data);
      toast.error("Final Product Deleted from the system!", {
        position: "top-right",
        autoClose: 2900,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });

      setTimeout(() => {
        toast.dismiss();
      }, 3000);

      const Element = document.querySelector(".Toastify");
      const config = { childList: true, attributes: true };
      const callBack = (ML, OB) => {
        for (const m of ML) {
          if (m.type === "childList" && m.addedNodes.length === 0) {
            window.location.reload();
          }
        }
      };
      const Obser = new MutationObserver(callBack);

      Obser.observe(Element, config);
    }
  };
  let navigate = useNavigate();
  const processProducts = async (element, data) => {
    console.log(data);
    const Data = [];
    data["SRDetails"].forEach((rd) => {
      Data.push(JSON.stringify(rd));
    });

    let newData = {
      PPN: data["FPN"],
      PPD: data["FPD"],
      PRM: Data.join("~"),
      PPP: data["FPP"],
    };

    const response = await api.post(`anpp`, newData);
    console.log(response);
    if (response["data"]["code"] === "Exe") {
      toast.warning("This was already added to Process Products", {
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
            navigate("/fp");
          }
        }
      };
      const Obser = new MutationObserver(callBack);

      Obser.observe(Element, config);
    } else {
      toast.success("Final Product has been added to Process", {
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
            navigate("/fp");
          }
        }
      };
      const Obser = new MutationObserver(callBack);

      Obser.observe(Element, config);
    }
  };
  return (
    <>
      {noProduct()}
      {/* <h1>HanUmaN</h1>
      <h3>Pra</h3> */}

      <ThemeProvider theme={myTheam}>
        <div className="CheckHeader">
          <Container>
            <Paper>
              <Box
                className={classes.TableTopRow}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography component="h1" variant="h5">
                  Final Materials
                </Typography>
              </Box>
              <Box
                className={classes.TableTopRow}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Box>
                  <Link
                    to="/fp/add"
                    state={{
                      Data: {
                        data: "a",
                        info: [
                          "Create New Final Product",
                          "You can create a new final product which is not yet available in system. \nNote: You cannot create raw product with same name.",
                          "Add Final Product",
                          false,
                        ],
                      },
                    }}
                  >
                    <Button color="secondary" variant="outlined" size="large">
                      Create Final Product
                    </Button>
                  </Link>
                </Box>

                <Box>
                  <Chip
                    className={classes.ClipCount}
                    label={fProduct.length}
                    color="secondary"
                  />
                </Box>
              </Box>
            </Paper>
            <Box>
              <MaterialTable
                columns={columns}
                data={data}
                title={""}
                isLoading={loading}
                detailPanel={(rowDetails) => {
                  console.log(rowDetails);
                  return (
                    <MaterialTable
                      columns={sRPColumns}
                      data={rowDetails["SRDetails"]}
                      title={""}
                      style={{ maxHeight: "25vh", overflow: "scroll" }}
                      isLoading={loading}
                      options={{
                        // pageSize: 10,
                        filtering: false,
                        exportButton: false,
                        addRowPosition: "first",
                        actionsColumnIndex: -1,
                        selection: false,
                        showSelectAllCheckbox: false,
                        showTextRowsSelected: false,
                        columnsButton: false,
                        header: true,
                        padding: "dense",
                        toolbarButtonAlignment: "left",
                        search: false,
                        grouping: true,
                        paging: false,
                        toolbar: false,
                        // filterType: "checkbox",
                      }}
                    />
                  );
                }}
                onRowClick={(evt, selectedRow, togglePannel) => (
                  setSelectedRow(selectedRow.tableData.id), togglePannel()
                )}
                actions={[
                  (rawData) => ({
                    icon: () => (
                      <Link
                        to="/fp/update"
                        state={{
                          Data: {
                            data: rawData[0],
                            info: [
                              "Update Final Product",
                              "You can make changes to existing Final Products in system.",
                              "Update Final Product",
                              true,
                            ],
                          },
                        }}
                      >
                        <EditIcon />
                      </Link>
                    ),

                    tooltip: "Edit",
                    onClick: () => console.log(rawData),
                  }),
                  {
                    icon: "delete",
                    tooltip: "Delete",
                    onClick: (e, data) => DeleteItems(e, data[0]),
                  },
                  {
                    icon: () => <AccountTreeIcon />,
                    tooltip: "Send For Process",
                    onClick: (e, data) => processProducts(e, data[0]),
                  },
                ]}
                options={{
                  pageSize: 10,
                  filtering: false,
                  exportButton: false,
                  addRowPosition: "first",
                  actionsColumnIndex: -1,
                  selection: true,
                  showSelectAllCheckbox: false,
                  showTextRowsSelected: false,
                  columnsButton: true,
                  header: true,
                  padding: "dense",
                  toolbarButtonAlignment: "left",
                  rowStyle: (rowData) => ({
                    backgroundColor:
                      selectedRow === rowData.tableData.id ? "#fff59d" : "#FFF",
                  }),
                }}
              />
            </Box>
          </Container>
        </div>
      </ThemeProvider>
      <ToastContainer />
    </>
  );
}

export default FPView;
