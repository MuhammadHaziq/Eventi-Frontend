import authAxios from "src/utils/axios";

export const addEvent = (data) => {
  return authAxios.post("/api/event", data);
};

export const getEvents = (filters) => {
  return authAxios.get("/api/event", { params: filters });
};

export const deleteEvent = (id) => {
  return authAxios.delete(`/api/event/${id}`);
};

export const getEvent = (id) => {
  return authAxios.get(`/api/event/${id}`);
};

export const updateEvent = (eventId, data) => {
  return authAxios.put(`/api/event/${eventId}`, data);
};

export const vendorJoinedEvent = (data) => {
  return authAxios.post("/api/join-event", data);
};

export const getJoinedVendor = (id, event_id) => {
  return authAxios.get(`/api/join-event/${id}/${event_id}`);
};

export const updateJoinedVendorEvent = (data) => {
  return authAxios.put(
    `/api/event/vendor-event-update/${data.event_id}/${data.account_id}`,
    data
  );
};

export const updateJoinedEvent = (data) => {
  return authAxios.put("/api/join-event", data);
};

export const customerJoinEvent = (eventId, account_id, data) => {
  return authAxios.put(`/api/event/${eventId}/${account_id}`, data);
};

export const approvedCustomerJoinEvent = async (eventId, account_id, data) => {
  try {
    return await authAxios.put(
      `/api/event/approved-customer-status/${eventId}/${account_id}`,
      data
    );
  } catch (e) {
    console.log(e.message);
    return null;
  }
};
 
export const updateCustomerStatus = (eventId, customer_id, data) => {
  return authAxios.put(
    `/api/event/update-customer-status/${eventId}/${customer_id}`,
    data
  );
};

export const updateVendorStatus = (data) => {
  return authAxios.put(
    `/api/event/update-vendor-status/${data.event_id}/${data.vendor_id}`,
    data
  );
};

export const approvedVendorJoinEvent = (eventId, account_id, data) => {
  return authAxios.put(
    `/api/event/approved-vendor-status/${eventId}/${account_id}`,
    data
  );
};

export const AddTicket = async (
  CurrentuserDataID,
  account_id,
  data
) => {
  console.log(CurrentuserDataID);
  console.log(data);
  console.log(account_id);
  return;
  try {
    return await authAxios.put(
      `/api/event/customer-reg-member`,
      data,
      CurrentuserDataID,
      account_id
    );
  } catch (e) {
    console.log(e.message);
    return null;
  }
};
 