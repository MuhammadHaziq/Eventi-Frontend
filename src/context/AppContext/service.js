import authAxios from "src/utils/axios";

export const getCurrentUserDetail = (account_id) => {
  return authAxios.get(`/api/account/${account_id}`);
};

export const vendorDropDown = () => {
  return authAxios.get("/api/vendor/vendor-drop-down");
};
