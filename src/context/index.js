import React from "react"
import { AppProvider } from "./AppContext";
import { AuthAppProvider } from "./AuthContext";
import { ProductAppProvider } from "./ProductContext";
import { VendorAppProvider } from "./VendorContext";
import { CustomerAppProvider } from "./CustomerContext";
import { ToastContextProvider } from "./ToastContext/ToastContext";
import App from "src/App";
function MainContext() {
    return (
        <ToastContextProvider>
            <AppProvider>
                <AuthAppProvider>
                    <ProductAppProvider>
                        <VendorAppProvider>
                            <CustomerAppProvider>
                                <App />
                            </CustomerAppProvider>
                        </VendorAppProvider>
                    </ProductAppProvider>
                </AuthAppProvider>
            </AppProvider>
        </ToastContextProvider>
    )
}
export default MainContext