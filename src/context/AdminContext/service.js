import authAxios from "src/utils/axios";

export const getAdmins = (filters) => {
  return authAxios.get("/api/admin", { params: filters });
};

export const deleteAdmin = (id) => {
  return authAxios.delete(`/api/admin/${id}`);
};

export const getAdmin = (id) => {
  return authAxios.get(`/api/admin/${id}`);
};

export const updateAdmin = (data) => {
  delete data.password;
  return authAxios.put(`/api/admin/${data.customerId}`, data);
};
