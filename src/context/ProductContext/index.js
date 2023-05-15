import React from "react"
import productReducer from "./reducer"
import productState from "./state"

const ProductStateContext = React.createContext();
const ProductDispatchContext = React.createContext();

function ProductAppProvider({ children }) {
    const [state, dispatch] = React.useReducer(productReducer, productState)
    return (
        <ProductStateContext.Provider value={state}>
            <ProductDispatchContext.Provider value={dispatch}>
                {children}
            </ProductDispatchContext.Provider>
        </ProductStateContext.Provider>
    )
}

function useProductAppState() {
    const context = React.useContext(ProductStateContext)
    if (!context) {
        throw new Error('useProductAppState must be used within the AuthAppProvider')
    }
    return context
}

function useProductAppDispatch() {
    const context = React.useContext(ProductDispatchContext)
    if (!context) {
        throw new Error('useProductAppDispatch must be used within the AuthAppProvider')
    }
    return context
}

export {
    ProductAppProvider,
    useProductAppState,
    useProductAppDispatch
}