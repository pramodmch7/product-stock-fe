import React from "react";
import { IconButton } from "@material-ui/core";
import PrintIcon from "@material-ui/icons/Print";
import { jsPDF } from "jspdf";

export default function DownloadPDF({ data }) {
  const downloadAsPDFN = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    const PDF = new jsPDF();

    PDF.text("Company Name", 105, 16, null, null, "center");
    PDF.text("Address1", 105, 21, null, null, "center");
    PDF.text("Address2", 105, 26, null, null, "center");
    PDF.text("Address3", 105, 31, null, null, "center");
    PDF.text("Address3", 105, 31, null, null, "center");
    PDF.text(`Date: ${today}`, 200, 40, null, null, "right");
    PDF.line(250, 43, 0, 43);
    PDF.text("Description", 57, 52, null, null, "center");
    PDF.text("Quantity", 133, 52, null, null, "center");
    PDF.line(120, 43, 120, (13 + 1.29) * 14);
    PDF.text("Price", 165, 52, null, null, "center");
    PDF.line(150, 43, 150, (13 + 1.29) * 14);
    PDF.text("Amount", 190, 52, null, null, "center");
    PDF.line(250, 55, 0, 55);
    PDF.line(179, 43, 179, 300);
    PDF.line(25, 43, 25, 300);
    PDF.text(`${data["PPN"]}`, 30, 61, null, null, "left");
    PDF.line(179, 63, 25, 63);
    data.PPL.forEach((pdfda, index) => {
      PDF.text(`${index + 1}`, 16, 70 + index * 10, null, null, "left");
      PDF.text(`${pdfda["RPN"]}`, 34, 70 + index * 10, null, null, "left");
      PDF.text(`${pdfda["RPQ"]}`, 130, 70 + index * 10, null, null, "left");
      PDF.text(`${pdfda["RPP"]}`, 160, 70 + index * 10, null, null, "left");
      PDF.text(`${pdfda["RPC"]}`, 192, 70 + index * 10, null, null, "left");
    });

    PDF.line(220, 13 * 15.5, 25, 13 * 15.5);
    PDF.text("Total", 160, (13 + 2) * 14, null, null, "center");
    PDF.text(`${data["PPP"]}`, 192, (13 + 2) * 14, null, null, "center");

    PDF.save(`CompanyName_${today}.pdf`);
  };

  return (
    <>
      <IconButton onClick={downloadAsPDFN}>
        <PrintIcon />
      </IconButton>
    </>
  );
}
