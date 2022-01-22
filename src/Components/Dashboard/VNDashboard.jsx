import React, { useState, useEffect } from "react";

import { Container } from "@material-ui/core";

import { getAllFinalProduct } from "../../Data/ProductsData";
import RPPiChart from "../Charts/RPCharts/RPPiChart";

import FPChartStacjed from "../Charts/FPCharts/FPChartStacjed";

export default function VNDashboard() {
  const [fProduct, setFProduct] = useState([]);

  const getFPData = async () => {
    let da = await getAllFinalProduct().then((data) => data);

    setFProduct(da.message);
  };
  useEffect(() => {
    getFPData();

    return () => {
      console.log("Cleaned Up!");
    };
  }, []);

  return (
    <>
      <Container>
        <div
          className="MapSec1"
          style={{ flexDirection: window.innerWidth < 768 ? "column" : "row" }}
        >
          <div>
            <RPPiChart />
          </div>
          <div>
            <h6>Final Product Details</h6>
            <div
              style={{
                width: "100%",
                display: "flex",
                overflow: "scroll",
              }}
            >
              {fProduct.map((fda, ind) => (
                <div key={ind} style={{ display: "inline-flex" }}>
                  <FPChartStacjed FData={[fda]} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
