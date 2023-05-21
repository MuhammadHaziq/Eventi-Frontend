function appReducer(state, action) {
  switch (action.type) {
    case "set": {
      return {
        ...state,
        sidebarShow: action.sidebarShow,
        unfoldable: action.unfoldable || false,
      };
    }
    case "SHOW_RESPONSE": {
      return {
        ...state,
        toast: action.toast,
      };
    }
    default: {
      return { ...state };
    }
  }
}
export default appReducer;
