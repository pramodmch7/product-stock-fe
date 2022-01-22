import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import {
  Avatar,
  Box,
  Button,
  Chip,
  Paper,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

import { RPColumns } from "../../Data/TabelRawProduct";
import { getAllRawProduct } from "../../Data/ProductsData";

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
      main: "#ff9100",
    },
    type: "light",
  },
});

function RPViewM() {
  const classes = ownStyles();
  const [rProduct, setRProduct] = useState([]);

  const getRowProducts = async () => {
    let da = await getAllRawProduct().then((data) => data);

    setRProduct(da["message"]);
    setloading(false);
  };

  const checkWidth = () => {
    window.innerWidth > 768 &&
      document.querySelector("#card-pr-blur").classList.add("container-fluid");
  };

  useEffect(() => {
    getRowProducts();

    return () => {
      console.log("Cleaning Up");
    };
  }, []);
  const addValies = () => {
    return rProduct.map((RProduct, nums) => {
      const Data = {
        ...RProduct,
        slno: nums + 1,
      };
      return Data;
    });
  };

  const getColumns = () => {
    return window.innerWidth > 768 ? RPColumns.Desk : RPColumns.Mobile;
  };

  window.addEventListener("resize", function () {
    getColumns();
  });

  const columns = getColumns();
  const data = addValies();

  const noProduct = () => {
    const Show = document.querySelector(".rt-noData");
    if (Show) {
      Show.innerHTML = "<b>No Product Available</b>";
    }
  };
  const [loading, setloading] = useState(true);

  const DeleteItems = async (ele, data) => {
    console.log(data);
    let del = window.confirm(
      `Are you Sure you want to delete the Raw Product "${data["RPN"]}"`
    );

    if (del) {
      await api.put(`drp/${data["id"]}`, data);
      toast.error("Raw Product Deleted from the system!", {
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
  return (
    <>
      <ThemeProvider theme={myTheam}>
        <div className="CheckHeader" id="card-pr-blur">
          <Container>
            <Paper>
              <Box
                className={classes.TableTopRow}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography component="h1" variant="h5">
                  Raw Materials
                </Typography>
              </Box>
              <Box
                className={classes.TableTopRow}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Box>
                  <Link
                    to="/rp/add"
                    state={{
                      Data: {
                        data: "a",
                        info: [
                          "Create New Raw Product",
                          "You can create a new raw product which is not yet available in system. \nNote: You cannot create raw product with same name.",
                          "Add Raw Product",
                          false,
                        ],
                      },
                    }}
                  >
                    <Button color="secondary" variant="contained" size="large">
                      Create Raw Product
                    </Button>
                  </Link>
                </Box>

                <Box>
                  <Chip
                    className={classes.ClipCount}
                    label={rProduct.length}
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
                actions={[
                  (rawData) => ({
                    icon: () => (
                      <Link
                        to="/rp/update"
                        state={{
                          Data: {
                            data: rawData[0],
                            info: [
                              "Update Raw Product",
                              "You can make changes to existing Raw Products in system.",
                              "Update Raw Product",
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

export default RPViewM;
