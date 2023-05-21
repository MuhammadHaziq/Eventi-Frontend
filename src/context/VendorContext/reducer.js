function vendorReducer(state, action){
    switch(action.type){
        case "GET_VENDORS":{
            return {...state, vendors:action.vendors}
        }
        default:{
            return {...state}
        }
    }
}

export default vendorReducer