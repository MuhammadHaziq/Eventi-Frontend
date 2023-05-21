import React from "react"
import customerReducer from "./reducer"
import customerState from "./state"

const CustomerStateContext = React.createContext();
const CustomerDispatchContext = React.createContext();

function CustomerAppProvider({ children }) {
    const [state, dispatch] = React.useReducer(customerReducer, customerState)
    return (
        <CustomerStateContext.Provider value={state}>
            <CustomerDispatchContext.Provider value={dispatch}>
                {children}
            </CustomerDispatchContext.Provider>
        </CustomerStateContext.Provider>
    )
}

function useCustomerAppState() {
    const context = React.useContext(CustomerStateContext)
    if (!context) {
        throw new Error('useCustomerAppState must be used within the CustomerAppProvider')
    }
    return context
}

function useCustomerAppDispatch() {
    const context = React.useContext(CustomerDispatchContext)
    if (!context) {
        throw new Error('useCustomerAppDispatch must be used within the CustomerAppProvider')
    }
    return context
}

export {
    CustomerAppProvider,
    useCustomerAppState,
    useCustomerAppDispatch
}