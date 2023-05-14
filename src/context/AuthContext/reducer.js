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
        }

}
export default authReducer