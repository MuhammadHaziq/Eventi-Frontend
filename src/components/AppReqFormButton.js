import React from "react";
import { cilPlaylistAdd } from "@coreui/icons";
import { CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";

const AppReqFormButton = ({
  onClick,
  className = "bt btn-info",
  title = "",
}) => {
  return (
    <>
      <CButton className={className} onClick={onClick} size="sm" title={title}>
        <CIcon icon={cilPlaylistAdd} className="text-white" />
      </CButton>
    </>
  );
};

export default AppReqFormButton;
