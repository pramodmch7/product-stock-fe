import React from "react";
import { Chart } from "react-google-charts";

function FPChartStacjed({ FData }) {
  const qtyData = [];
  const options = {
    isStacked: "percent",
    width: "100%",
    height: "50vh",
    legend: { position: "top", maxLines: 3 },
    chart: {
      title: "Chess opening moves",
      subtitle: "popularity by percentage",
    },
    bar: { groupWidth: "75%" },
    vAxis: {
      minValue: 0,
      ticks: [0, 0.3, 0.6, 0.9, 1],
    },
  };

  const addValies = () => {
    qtyData.push(["Final Product", { role: "style" }]);

    FData.map((FData, nums) => {
      qtyData.push([FData["FPN"]]);

      FData["SRDetails"].map((frprods, frpI) => {
        qtyData[nums][frpI + 1] = frprods["RPN"];
        qtyData[nums + 1][frpI + 1] = frprods["NRPQ"];
      });
    });
  };
  addValies();

  return (
    <>
      <Chart
        chartType="ColumnChart"
        data={qtyData}
        width="100%"
        options={options}
      />
    </>
  );
}

export default FPChartStacjed;
