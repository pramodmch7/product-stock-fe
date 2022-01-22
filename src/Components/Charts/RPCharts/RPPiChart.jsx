import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { Container, Box } from "@material-ui/core";

import { getAllRawProduct } from "../../../Data/ProductsData";

function RPPiChart() {
  const [rProduct, setRProduct] = useState([]);

  const getRPData = async () => {
    let da = await getAllRawProduct().then((data) => data);

    setRProduct(da.message);
  };

  useEffect(() => {
    getRPData();
    return () => {
      console.log("Cleaned Up!");
    };
  }, []);

  const qtyData1 = [];
  const options1 = {
    title: "Available Stocks of Raw Material",
    pieHole: 0.2,
    is3D: "false",
    pieSliceText: "values",
    width: "100%",
    height: "70vh",
    chartArea: {
      width: "100%",
    },
    legend: {
      position: "top",
      maxLines: 5,
      alignment: "left",
    },
    tooltip: {
      textStyle: { color: "#FF0000" },
      showColorCode: true,
    },
  };

  const addValies1 = () => {
    qtyData1.push(["", ""]);
    return rProduct.map((rProduct, nums) => {
      qtyData1.push([rProduct["RPN"], rProduct["RPQ"]]);
    });
  };
  addValies1();
  return (
    <>
      <Container>
        <Box marginTop={1}>
          <Chart
            chartType="PieChart"
            data={qtyData1}
            width="100%"
            options={options1}
          />
        </Box>
      </Container>
    </>
  );
}

export default RPPiChart;
