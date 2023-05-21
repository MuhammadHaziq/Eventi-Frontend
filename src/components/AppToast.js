import React from "react";
import { CToast, CToastBody } from "@coreui/react";

export const AppToast = ({ message, color }) => {
  return (
    <CToast autohide={true} className={color}>
      <CToastBody>{message}</CToastBody>
    </CToast>
  );
};
