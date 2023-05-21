import moment from "moment";

export const dateFormat = (date) => {
  return date && moment(date).format("MM-DD-YYYY HH:MM");
};
