import React, { useState } from "react";

import InfoView from "./InfoView";

function InfoViewBtn({ Click }) {
  const [infoData, setInfoData] = useState("");
  const [infoClicked, setInfoClicked] = useState(false);

  const InfoClicked = (ele) => {
    setInfoData(Click);
    setInfoClicked(true);

    document.querySelector("#card-pr-blur").classList.add("Card-Pr-Blur");
  };

  const onChangeEvent = (value) => {
    if (value === undefined) {
      document.querySelector("#card-pr-blur").classList.remove("Card-Pr-Blur");
      setInfoClicked(false);
    }
  };
  return (
    <>
      <span
        className="material-icons COM text-info"
        id="infoButton"
        onClick={(e) => InfoClicked(e)}
      >
        info
      </span>
      {infoClicked && (
        <InfoView data={infoData} views={onChangeEvent} clicked={infoClicked} />
      )}
    </>
  );
}

export default InfoViewBtn;
