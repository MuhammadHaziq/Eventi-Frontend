export const EventStatuses = (status) => {
  const eventStatus = {
    "": "Request To Join",
    Pending: "Request To Join",
    "Pending For Payment": "Pay Now",
    Approved: "Approved & Paid",
  };
  return eventStatus[status] || "Request To Join";
};

export const UserRequestEventStatuses = (status) => {
  const eventStatus = {
    "": "Request To Join",
    Pending: "Request To Join",
    "Pending For Payment": "Approved",
    Approved: "Approved",
  };
  return eventStatus[status] || "Request To Join";
};

export const AdminEventStatuses = (status) => {
  const eventStatus = {
    "": "",
    "Request To Join": "Awaitng For Approvel",
    "Pending For Payment": "Approved & Waiting For Payment",
    Approved: "Approved & Paid",
  };
  return eventStatus[status] || "Request To Join";
};

export const AdminRequestEventStatuses = (status) => {
  const eventStatus = {
    "": "",
    "Request To Join": "Pending For Payment",
    "Pending For Payment": "Pending For Payment",
    Approved: "Approved",
  };
  return eventStatus[status] || "Pending";
};
