import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "../CommonComps/Button";

let api = axios.create({
  baseURL: `/`,
});

function InfoView({ data, views }) {
  const [View, setView] = useState(true);
  const closeInfo = () => {
    setView(false);
    views();
  };
  const DeleteItems = async (ele, data) => {
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
    View
      ? document.querySelector("#cardSelect").classList.add("Card_Pr_Af")
      : document.querySelector("#cardSelect").classList.remove("Card_Pr_Af");
  };

  return ReactDOM.createPortal(
    <>
      {View ? (
        <div className="Card-Pr-Bg">
          <div className="card-body Card-Pr Card_Pr" id="cardSelect">
            <div className="mdc-card">
              <div>
                <span
                  className="material-icons COM COM-Mar "
                  onClick={closeInfo}
                  style={{ color: "red", float: "right", fontWeight: 900 }}
                >
                  close
                </span>
              </div>
              <div>
                <h4 className="card-text">{data.RPN}</h4>
              </div>
              <div>
                <h6>Description: {data.RPD}</h6>
              </div>
              <div>
                <h6>Weight: {data.RPW}</h6>
              </div>
              <div
                className="D-Flex"
                style={{ flexDirection: "row", justifyContent: "space-evenly" }}
              >
                <div
                  className="Pra-Tbl-Det"
                  style={{
                    flexDirection: "column",
                  }}
                >
                  <p className="viewDataT text-right">Available Qty</p>
                  <p className="viewDataT text-right">Price</p>
                  <p className="viewDataT text-right">Total Cost</p>
                </div>
                <div
                  className="Pra-Tbl-Det"
                  style={{
                    flexDirection: "column",
                  }}
                >
                  <p className="viewDataD text-left">{data.RPQ}</p>
                  <p className="viewDataD text-left">{data.RPP}</p>
                  <p className="viewDataD text-left">
                    AED {data.RPQ * data.RPP}
                  </p>
                </div>
              </div>
              <span className="D-Flex D-Flex-New-row" style={{ width: "100%" }}>
                <Link
                  to="/rp/update"
                  state={{
                    Data: {
                      data: data,
                      info: [
                        "Update Raw Product",
                        "You can make changes to existing Raw Products in system.",
                        "Update Raw Product",
                        true,
                      ],
                    },
                  }}
                >
                  <Button btnName="Edit" btnStyle="btn-info" btnSize="btn-md">
                    <span className="material-icons COM COM-Mar">
                      mode_edit_outline
                    </span>
                    <span className="COM">Edit</span>
                  </Button>
                </Link>
                <Button
                  btnName="Del"
                  btnStyle="btn-danger"
                  btnSize="btn-md"
                  onClick={(e) => DeleteItems(e, data)}
                >
                  <span className="material-icons COM COM-Mar">
                    delete_outline
                  </span>
                  <span className="COM">Del</span>
                </Button>
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </>,
    document.getElementById("InfoView")
  );
}

export default InfoView;
