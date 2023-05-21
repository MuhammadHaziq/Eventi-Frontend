import authAxios from "src/utils/axios";

export const getCustomers = () => {
  return authAxios.get("/api/customer");
};

export const deleteCustomer = (id) => {
  return authAxios.delete(`/api/customer/${id}`);
};

export const getCustomer = (id) => {
  return authAxios.get(`/api/customer/${id}`);
};

export const updateCustomer = (data) => {
  delete data.password;
  return authAxios.put(`/api/customer/${data.customerId}`, data);
};
