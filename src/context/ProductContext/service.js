import authAxios from "src/utils/axios";

export const getProducts = () => {
  return authAxios.get("/api/product");
};

export const addProduct = (data) => {
  return authAxios.post("/api/product", data);
};

export const updateProduct = (data) => {
  return authAxios.put("/api/product", data);
};

export const deleteProduct = (id) => {
  return authAxios.delete(`/api/product/${id}`);
};

export const getProduct = (id) => {
  return authAxios.get(`/api/product/${id}`);
};
