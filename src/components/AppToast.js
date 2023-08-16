import React from "react";
import { CToast, CToastBody, CToastClose } from "@coreui/react";

export const AppToast = ({ message, color }) => {
  return (
    <CToast autohide={true} className={color}>
      <div className="d-flex">
        <CToastBody>{message}</CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  );
};
