import React from "react";
import { AppProvider } from "./AppContext";
import { AuthAppProvider } from "./AuthContext";
import App from "src/App";
function MainContext() {
  return (
    <AppProvider>
      <AuthAppProvider>
        <App />
      </AuthAppProvider>
    </AppProvider>
  );
}
export default MainContext;
