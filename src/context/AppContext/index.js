import React from "react";
import appState from "./state";
import appReducer from "./reducer";
import { CToaster } from "@coreui/react";
const AppStateContext = React.createContext();
const AppDispatchContext = React.createContext();

function AppProvider({ children }) {
  const [state, dispatch] = React.useReducer(appReducer, appState);
  const toaster = React.useRef();

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        <CToaster ref={toaster} placement="top-end" push={state.toast} />
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

function useAppState() {
  const context = React.useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within the AppProvider");
  }
  return context;
}

function useAppDispatch() {
  const context = React.useContext(AppDispatchContext);
  if (!context) {
    throw new Error("useAppDispatch must be used within the AppProvider");
  }
  return context;
}

export { AppProvider, useAppState, useAppDispatch };
