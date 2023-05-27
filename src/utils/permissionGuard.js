import jwtDecode from "jwt-decode";
const permissionGuard = (permissionCode) => {
  const currentUser = jwtDecode(window.localStorage.getItem("eventi"))?.user;
  if (currentUser) {
    const userPermission =
      currentUser &&
      (currentUser.permissions || []).findIndex(
        (item) => item !== null && item.permission === permissionCode
      );
    console.log(
      userPermission,
      currentUser,
      permissionCode,
      userPermission !== -1
    );
    if (userPermission !== -1) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export default permissionGuard;
