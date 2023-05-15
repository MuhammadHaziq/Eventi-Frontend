import React from "react"
import { AppProvider } from "./AppContext";
import { AuthAppProvider } from "./AuthContext";
import { ProductAppProvider } from "./ProductContext";
import App from "src/App";
function MainContext() {
    return (
        <AppProvider>
            <AuthAppProvider>
                <ProductAppProvider>
                    <App />
                </ProductAppProvider>
            </AuthAppProvider>
        </AppProvider>
    )
}
export default MainContext