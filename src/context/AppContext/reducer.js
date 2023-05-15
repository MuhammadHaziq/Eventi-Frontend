function appReducer(state, action){
    switch(action.type){
        case "set":{
            return {
                ...state,
                sidebarShow:action.sidebarShow,
                unfoldable:action.unfoldable || false
            }
        }
        default:{
            return {...state}
        }
    }
}
export default appReducer