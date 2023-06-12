import React from "react";
import { cilPencil } from "@coreui/icons";
import { CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";

const AppEditButton = ({ onClick, className = "bt btn-warning", edit_id }) => {
  return (
    <>
      <CButton className={className} onClick={() => onClick(edit_id)} size="md">
        <CIcon icon={cilPencil} className="text-white" />
      </CButton>
    </>
  );
};

export default AppEditButton;
