import jwtDecode from "jwt-decode";
const permissionGuard = (permissionCode) => {
  if (window.localStorage.getItem("eventi")) {
    const currentUser = jwtDecode(window.localStorage.getItem("eventi"))?.user;
    if (currentUser) {
      const userPermission =
        currentUser &&
        (currentUser.permissions || []).findIndex(
          (item) => item !== null && item.permission === permissionCode
        );
      if (userPermission !== -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  return false;
};

export default permissionGuard;
