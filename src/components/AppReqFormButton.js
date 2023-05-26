import React from "react";
import { cilPlaylistAdd } from "@coreui/icons";
import { CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";

const AppReqFormButton = ({ onClick, className = "bt btn-info", req_data }) => {
  const { req_id, reqIDForm } = req_data;
console.log(req_data);
  return (
    <>
      <CButton className={className} onClick={() => onClick(req_id,reqIDForm)} size="sm">
        <CIcon icon={cilPlaylistAdd} className="text-white" />
      </CButton>
    </>
  );
};

export default AppReqFormButton;
