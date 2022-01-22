import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
import { Box, Paper, Typography } from "@material-ui/core";

import { PPColumns } from "../../Data/TabelProcessProduct";

import { SRPColumns } from "../../Data/TabelSelectedRawProduct";
import { getAllProcessProdct } from "../../Data/ProductsData";

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

function PPView() {
  const classes = ownStyles();

  const [PProducts, setPProducts] = useState([]);
  const [loading, setloading] = useState(true);

  const getProcessedProducts = async () => {
    let da = await getAllProcessProdct().then((data) => data);

    setPProducts(da["message"]);
    setloading(false);
  };

  useEffect(() => {
    getProcessedProducts();

    return () => {
      console.log("Cleaning Up");
    };
  }, []);
  const addValies = () => {
    return PProducts.map((PProduct, nums) => {
      const Data = {
        ...PProduct,
        slno: nums + 1,
      };
      return Data;
    });
  };

  const getColumns = () => {
    return window.innerWidth > 768 ? PPColumns.Desk : PPColumns.Mobile;
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

  let navigate = useNavigate();

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
                  Process Products
                </Typography>
              </Box>
            </Paper>
            <Box>
              <MaterialTable
                columns={columns}
                data={data}
                title={""}
                isLoading={loading}
                detailPanel={(rowDetails) => {
                  return (
                    <MaterialTable
                      columns={sRPColumns}
                      data={rowDetails["PPL"]}
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
                onRowClick={(e, rowData, togglePannel) => togglePannel()}
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
                  // filterType: "checkbox",
                }}
              />
            </Box>
          </Container>
        </div>
      </ThemeProvider>
    </>
  );
}

export default PPView;
