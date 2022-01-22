import React from "react";

import "./css/chartsvg.css";

function ChartSVG({ data }) {
  console.log(data);
  const dataPerc = [];
  const add = (acc, a) => acc + a;
  const sumNum = data["data"].reduce(add, 0);
  console.log(sumNum);
  data["data"].map((qty) => {
    let per = (qty / sumNum) * 100;
    let newPer = Math.round(per * 100) / 100;
    dataPerc.push(newPer);
  });
  dataPerc.sort((a, b) => b - a);
  console.log(dataPerc);
  const dataNewPerc = [90, 20];
  const showChart = dataNewPerc.map((cd, ci) => (
    <circle
      r="15"
      cx={"50%"}
      cy={"50%"}
      fill="transparent"
      stroke={data["bgColors"][ci + 7]}
      strokeWidth={5}
      strokeDasharray={`calc(${cd} * (3.14159 * 30)/100), calc(3.14159 * 30), 50, 20`}
      transform="rotate(-90) translate(-50)"
    />
  ));
  //   console.log(dataPerc);
  return (
    <div>
      <svg width="400" height="210">
        {/* {showChart} */}
        <path d="M150 0 C75 200 " />

        {/* <circle
          r="15"
          cx={"50%"}
          cy={"50%"}
          fill="transparent"
          stroke="red"
          strokeWidth={5}
          //   strokeDasharray={"calc(70 * (3.14159 * 30)/100) calc(3.14159 * 30)"}
          strokeDasharray="calc(99 * (3.14159 * 30)/100)"
          transform="rotate(-80) translate(-50)"
        /> */}
        {/* <circle
          r="15"
          cx={"50%"}
          cy={"50%"}
          fill="transparent"
          stroke="purple"
          strokeWidth={5}
          strokeDasharray="calc(50 * (3.14159 * 30)/100)"
          //   strokeDasharray={"calc(60 * (3.14159 * 30)/100) calc(3.14159 * 30)"}
          transform="rotate(-90) translate(-50)"
        /> */}
        {/* <circle
          r="15"
          cx={"50%"}
          cy={"50%"}
          fill="transparent"
          stroke="yellow"
          strokeWidth={5}
          strokeDasharray={"calc(30 * (3.14159 * 30)/100) calc(3.14159 * 30)"}
          transform="rotate(-90) translate(-50)"
        /> */}
      </svg>
    </div>
  );
}

export default ChartSVG;
