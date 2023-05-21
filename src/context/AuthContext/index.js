import React from 'react'
import authState from "./state"
import authReducer from './reducer'
const AppStateContext = React.createContext()
const AppDispatchContext = React.createContext()

function AuthAppProvider({ children }) {
    const [state, dispatch] = React.useReducer(authReducer, authState)
    return (
        <AppStateContext.Provider value={state}>
            <AppDispatchContext.Provider value={dispatch}>
                {children}
            </AppDispatchContext.Provider>
        </AppStateContext.Provider>
    )
}
function useAuthAppState() {
    const context = React.useContext(AppStateContext)
    if (!context) {
        throw new Error('useAuthAppState must be used within the AuthAppProvider')
    }
    return context
}

function useAuthAppDispatch() {
    const context = React.useContext(AppDispatchContext)
    if (!context) {
        throw new Error('useAuthAppDispatch must be used within the AuthAppProvider')
    }
    return context
}

export {
    AuthAppProvider,
    useAuthAppState,
    useAuthAppDispatch
}