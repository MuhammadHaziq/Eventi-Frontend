import authAxios from "src/utils/axios";

export const getCurrentUserDetail = (userId, userType) => {
  return authAxios.get(`/api/user/${userId}/${userType}`);
};
