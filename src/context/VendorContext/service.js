import authAxios from "src/utils/axios";

export const getAllVendors = (filters) => {
  return authAxios.get("/api/vendor/all");
};

export const getVendors = (filters) => {
  return authAxios.get("/api/vendor", { params: filters });
};

export const deleteVendor = (account_id) => {
  return authAxios.delete(`/api/vendor/${account_id}`);
};

export const getVendor = (account_id) => {
  return authAxios.get(`/api/vendor/${account_id}`);
};

export const updateVendor = (data) => {
  delete data.password;
  return authAxios.put(`/api/vendor/${data.account_id}`, data);
};
