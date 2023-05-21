import authAxios from "src/utils/axios";

export const getVendors = (filters) => {
  return authAxios.get("/api/vendor", { params: filters });
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
