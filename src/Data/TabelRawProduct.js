import InfoViewBtn from "../Components/InfoViewBtn";

export const RPColumns = {
  Mobile: [
    {
      title: "Sl No",
      width: "5%",
      field: "slno",
      filtering: false,
      editable: "never",
    },
    {
      title: "Name",
      field: "RPN",
      width: "50%",
    },
    {
      title: "Quantity",
      field: "RPQ",
      filtering: false,
      width: "10%",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Info",
      field: "info",
      filtering: false,
      editable: "never",
      width: "10%",
      render: (rowData) => <InfoViewBtn Click={rowData} />,
    },
  ],
  Desk: [
    {
      title: "Sl No",
      width: "5%",
      field: "slno",
      filtering: false,
      editable: "never",
    },
    {
      title: "Name",
      field: "RPN",
      width: "40%",
    },
    {
      title: "Description",
      field: "RPD",
      width: "40%",
    },
    {
      title: "Weight",
      field: "RPW",
      filtering: false,
      width: "5%",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Quantity",
      field: "RPQ",
      filtering: false,
      width: "5%",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Price",
      field: "RPP",
      filtering: false,
      width: "10%",
    },
    {
      title: "Cost",
      field: "RPCost",
      filtering: false,
      type: "currency",
      currencySetting: { currencyCode: "AED" },
      editable: "never",
    },
  ],
};
