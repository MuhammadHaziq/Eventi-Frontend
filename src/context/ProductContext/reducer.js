function productReducer(state, action){
    switch(action.type){
        case "ADD_PRODUCT": {
            return {...state, products:[action.product, ...(state.products || [])]}
        }
        
        case "GET_PRODUCTS":{
            return {...state, products:action.products}
        }
        default:{
            return {...state}
        }
    }
}

export default productReducer