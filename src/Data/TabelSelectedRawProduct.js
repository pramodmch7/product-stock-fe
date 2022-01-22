export const SRPColumns = {
  Mobile: [
    {
      title: "Name",
      field: "RPN",
      filtering: false,
    },

    {
      title: "Quantity",
      field: "RPQ",
      filtering: false,
      width: 80,
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Price",
      field: "RPP",
      filtering: false,
      width: 80,
      type: "currency",
      currencySetting: { currencyCode: "AED" },
    },
    {
      title: "Cost",
      field: "RPC",
      filtering: false,
      Cell: ({ row }) => <span>{row["Sqty"] * row["Sprice"]}</span>,
      width: 100,
      type: "currency",
      currencySetting: { currencyCode: "AED" },
    },
  ],
  Desk: [
    {
      title: "Name",
      field: "RPN",
      width: "60%",
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
      title: "Price",
      field: "RPP",
      filtering: false,
      width: "20%",
      type: "currency",
      currencySetting: { currencyCode: "AED" },
    },
    {
      title: "Cost",
      field: "RPC",
      filtering: false,
      width: "30%",
      type: "currency",
      currencySetting: { currencyCode: "AED" },
    },
  ],
};
