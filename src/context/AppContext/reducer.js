function appReducer(state, action){
    switch(action.type){
        case "USER_LOGIN":{
            return {
                ...state,
                sidebarShow:action.sidebarShow,
            }
        }
    }
}
export default appReducer