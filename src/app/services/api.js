import axios from "axios";

const API = "http://localhost:5000";

export const getProducts = async () => {
  const res = await axios.get(`${API}/products`);
  return res.data;
};
export const getProduct = async (id) => {
  const res = await fetch(`http://localhost:5000/products/${id}`);
  return res.json();
};