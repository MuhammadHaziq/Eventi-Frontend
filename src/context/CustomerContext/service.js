import authAxios from "src/utils/axios";

export const allEventCustomers = async () => {
  try {
    const response = await authAxios.get("/api/event/allevents");
    if (response.status === 200) {
      return { status: true, data: response?.data?.data }
    } else {
      return { status: false, message: response.data.message }
    }
  
  } catch(e){
    return { status: false, message: e.message}
  }
};
export const updateCustomerPoints = (data) => {
  return authAxios.post('/api/event/updatepoints', data);
};

export const getCustomers = (filters) => {
  return authAxios.get("/api/customer", { params: filters });
};

export const deleteCustomer = (id) => {
  return authAxios.delete(`/api/customer/${id}`);
};
export const customerPaymentHistory = (account_id) => {
  return authAxios.get(`/api/customer/history/${account_id}`);
};

export const getCustomer = (id) => {
  return authAxios.get(`/api/customer/${id}`);
};

export const updateCustomer = (data) => {
  delete data.password;
  return authAxios.put(`/api/customer/${data.customerId}`, data);
};


