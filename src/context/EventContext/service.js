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

export const updateEvent = (data) => {
  return authAxios.put(`/api/event/${data.eventId}`, data);
};
