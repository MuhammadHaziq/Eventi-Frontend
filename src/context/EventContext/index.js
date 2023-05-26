import React from "react"
import eventReducer from "./reducer"
import eventState from "./state"

const EventStateContext = React.createContext();
const EventDispatchContext = React.createContext();

function EventAppProvider({ children }) {
    const [state, dispatch] = React.useReducer(eventReducer, eventState)
    return (
        <EventStateContext.Provider value={state}>
            <EventDispatchContext.Provider value={dispatch}>
                {children}
            </EventDispatchContext.Provider>
        </EventStateContext.Provider>
    )
}

function useEventAppState() {
    const context = React.useContext(EventStateContext)
    if (!context) {
        throw new Error('useEventAppState must be used within the EventAppProvider')
    }
    return context
}

function useEventAppDispatch() {
    const context = React.useContext(EventDispatchContext)
    if (!context) {
        throw new Error('useEventAppDispatch must be used within the EventAppProvider')
    }
    return context
}

export {
    EventAppProvider,
    useEventAppState,
    useEventAppDispatch
}
