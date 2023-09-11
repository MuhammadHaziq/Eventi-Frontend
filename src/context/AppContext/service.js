import authAxios from "src/utils/axios";

export const getCurrentUserDetail = (account_id) => {
  return authAxios.get(`/api/account/${account_id}`);
};

export const vendorDropDown = async () => {
  try {
    const response = await authAxios.get("/api/vendor/vendor-drop-down");
    if (response.status === 200) {
      return { status: true, data: response?.data?.data };
    } else {
      return { status: false, message: response.data.message };
    }
  } catch (e) {
    console.log("vendorDropDown", e.message);
    return null;
  }
};

export const updateAccount = (account_id, data) => {
  return authAxios.put(`/api/account/${account_id}`, data);
};

export const getAttendes = async () => {
  return await authAxios.get("/api/attende/");
};

export const getAccountAttendes = async (account_id, event_id) => {
  return await authAxios.get(`/api/attende/${account_id}/${event_id}`);
};
export const summaryCustomerPoints = (eventId, customer_id) => {
  
  return authAxios.get(
    `/api/dashboard/customer_dashboard/${eventId}/${customer_id}`,
  );
};
