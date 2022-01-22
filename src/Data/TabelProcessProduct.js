import DownloadPDF from "../Components/DownloadPDF";

export const PPColumns = {
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
      field: "PPN",
    },

    {
      title: "Price",
      field: "PPP",
      filtering: false,
      width: 80,
      editable: "never",
      type: "currency",
      currencySetting: { currencyCode: "AED" },
    },

    {
      title: "Action",

      filtering: false,
      editable: "never",
      render: (rowData) => <DownloadPDF data={rowData} />,
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
      field: "PPN",
    },
    {
      title: "Description",
      field: "PPD",
    },

    {
      title: "Price",
      field: "PPP",
      filtering: false,
      width: 80,
      editable: "never",
      type: "currency",
      currencySetting: { currencyCode: "AED" },
    },

    {
      title: "Action",

      filtering: false,
      editable: "never",
      render: (rowData) => <DownloadPDF data={rowData} />,
    },
  ],
};
