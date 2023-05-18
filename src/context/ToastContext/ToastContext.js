import React, { useCallback, useEffect, useState, createContext } from 'react'
import { CToaster, CAlert } from '@coreui/react';
const ToastContext = createContext()

export default ToastContext

export function ToastContextProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        if (toasts?.length > 0) {
            const timer = setTimeout(() => {
                setToasts(toasts => toasts.slice(1))
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [toasts])


    const addToast = useCallback(
        function (toast) {
            setToasts([...toasts, toast])
        }, [setToasts]
    );

  
    //     { position: 'static' },
    //     { position: 'static' },
    //     { position: 'top-right' }
    // ];

    // let toasters = (() => {
    //     return toasts.reduce((toasters, toast) => {
    //         toasters[toast.position] = toasters[toast.position] || []
    //         toasters[toast.position].push(toast)
    //         return toasters
    //     }, {})
    // })();
    return (
        <ToastContext.Provider value={addToast}>
            {toasts.map((item, index) => (
                <CToaster placement="top-right" key={index}> 
                    <CAlert
                        color={item.messageType}
                        show={"true"}
                    // onShowChange={closeError}
                    >
                        {item.message}
                    </CAlert>
                </CToaster>))}
            {children}
        </ToastContext.Provider>
    )
}