import React from "react"
import vendorReducer from "./reducer"
import vendorState from "./state"

const VednorStateContext = React.createContext();
const VednorDispatchContext = React.createContext();

function VendorAppProvider({ children }) {
    const [state, dispatch] = React.useReducer(vendorReducer, vendorState)
    return (
        <VednorStateContext.Provider value={state}>
            <VednorDispatchContext.Provider value={dispatch}>
                {children}
            </VednorDispatchContext.Provider>
        </VednorStateContext.Provider>
    )
}

function useVendorAppState() {
    const context = React.useContext(VednorStateContext)
    if (!context) {
        throw new Error('useVendorAppState must be used within the VendorAppProvider')
    }
    return context
}

function useVendorAppDispatch() {
    const context = React.useContext(VednorDispatchContext)
    if (!context) {
        throw new Error('useVendorAppDispatch must be used within the VendorAppProvider')
    }
    return context
}

export {
    VendorAppProvider,
    useVendorAppState,
    useVendorAppDispatch
}