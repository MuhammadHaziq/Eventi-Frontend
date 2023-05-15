function authReducer(state, action){
        switch(action.type){
            case "USER_LOGIN":{
                return {
                    ...state,
                    auth:true,
                    user:action.user,
                    token:action.token
                }
            }
            default:{
                return {...state}
            }
        }

}
export default authReducer