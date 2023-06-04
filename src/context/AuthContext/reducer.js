function authReducer(state, action) {
  switch (action.type) {
    case "USER_LOGIN": {
      return {
        ...state,
        auth: true,
        user: action.user,
        user_id: action.user?._id,
      };
    }
    default: {
      return { ...state };
    }
  }
}
export default authReducer;
