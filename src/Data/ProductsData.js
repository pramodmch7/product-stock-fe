import axios from "axios";

const api = axios.create({
  baseURL: "/",
});

export let getAllRawProduct = async () => {
  let da = await api.get(`garp`).then(({ data }) => data);
  return da;
};

export let getAllFinalProduct = async () => {
  let da = await api.get(`gafp`).then(({ data }) => data);
  return da;
};

export let getOneFinalProduct = async (id) => {
  let da = await api.get(`gsfp/${id}`).then(({ data }) => data);
  return da;
};

export let getAllProcessProdct = async () => {
  let da = await api.get(`gapp`).then(({ data }) => data);
  return da;
};
