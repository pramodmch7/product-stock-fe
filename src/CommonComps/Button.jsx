import React from "react";
import "./css/button.css";

export default function Button(props) {
  // console.log(props);
  const { btnStyle, btnSize, onClick, children } = props;
  return (
    <>
      <span className={`btn ${btnSize} ${btnStyle}  Mar-P`} onClick={onClick}>
        {children}
      </span>
    </>
  );
}

// export default Button;
