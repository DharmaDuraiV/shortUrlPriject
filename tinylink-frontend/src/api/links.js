import axios from "axios";

const API = "http://localhost:3000/api/links";

export const getLinks = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const createLink = async (body) => {
  const res = await axios.post(API, body);
  return res.data;
};

export const deleteLink = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};
