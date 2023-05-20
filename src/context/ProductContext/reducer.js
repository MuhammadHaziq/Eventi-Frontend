function productReducer(state, action) {
  switch (action.type) {
    case "ADD_PRODUCT": {
      return {
        ...state,
        products: [action.product, ...(state.products || [])],
      };
    }
    case "EDIT_PRODUCT": {
      return {
        ...state,
        products: state.products.slice().map((item) => {
          if (item._id === action.product._id) {
            return action.product;
          }
          return item;
        }),
      };
    }

    case "GET_PRODUCTS": {
      return { ...state, products: action.products };
    }
    default: {
      return { ...state };
    }
  }
}

export default productReducer;
