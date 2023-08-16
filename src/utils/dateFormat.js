import moment from "moment";

export const dateFormat = (date) => {
  return date && moment(date).format("MM-DD-YYYY HH:MM");
};
export const dateFormatted = (date) => {
  const dates = new Date();
  return dates
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("-");
};
