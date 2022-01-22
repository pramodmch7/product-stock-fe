export const FPColumns = {
  Mobile: [
    {
      title: "Sl No",
      field: "slno",
      filtering: false,
      width: 40,
      editable: "never",
    },
    {
      title: "Name",
      field: "FPN",
    },
    {
      title: "Price",
      field: "FPP",
      filtering: false,
      width: 80,
      editable: "never",
      type: "currency",
      currencySetting: { currencyCode: "AED" },
    },
  ],
  Desk: [
    {
      title: "Sl No",
      field: "slno",
      filtering: false,
      width: 40,
      editable: "never",
    },
    {
      title: "Name",
      field: "FPN",
    },
    {
      title: "Description",
      field: "FPD",
    },

    {
      title: "Price",
      field: "FPP",
      filtering: false,
      width: 80,
      editable: "never",
      type: "currency",
      currencySetting: { currencyCode: "AED" },
    },
  ],
};
