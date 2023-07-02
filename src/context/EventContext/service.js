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

export const adminUpdateCustomerStatus = (eventId, customer_id, data) => {
  return authAxios.put(
    `/api/event/adminUpdateCustomerStatus/${eventId}/${customer_id}`,
    data
  );
};

export const adminUpdateVendorStatus = (data) => {
  return authAxios.put(
    `/api/event/adminUpdateVendorStatus/${data.event_id}/${data.vendor_id}`,
    data
  );
};
