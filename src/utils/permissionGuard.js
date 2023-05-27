const permissionGuard = (permissionCode) => {
  console.log(permissionCode);
  const currentUser = window.localStorage.getItem("eventi")?.user;
  if (currentUser !== null) {
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
