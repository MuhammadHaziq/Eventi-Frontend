import authAxios from "src/utils/axios";

export const getVendors = () => {
  return authAxios.get("/api/vendor");
};

export const deleteVendor = (id) => {
  return authAxios.delete(`/api/vendor/${id}`);
};

export const getVendor = (id) => {
  return authAxios.get(`/api/vendor/${id}`);
};

export const updateVendor = (data) => {
  delete data.password;
  return authAxios.put(`/api/vendor/${data.vendorId}`, data);
};
