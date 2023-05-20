import React, { useState } from "react";
import { cilTrash } from "@coreui/icons";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useAppDispatch } from "src/context/AppContext";
import { AppToast } from "./AppToast";
const AppDeleteButton = ({
  delete_id,
  message,
  title,
  apiUrl,
  className = "btn btn-danger",
}) => {
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const onDelete = () => {
    try {
      setIsLoading(true);
      apiUrl(delete_id)
        .then((response) => {
          dispatch({
            type: "SHOW_RESPONSE",
            toast: AppToast({
              message: response.data.message,
              color: "success-alert",
            }),
          });
          setIsLoading(false);
          setVisible(false);
        })
        .catch((err) => {
          setIsLoading(false);
          dispatch({
            type: "SHOW_RESPONSE",
            toast: AppToast({ message: err.message, color: "danger-alert" }),
          });
        });
    } catch (err) {
      setIsLoading(false);
      dispatch({
        type: "SHOW_RESPONSE",
        toast: AppToast({ message: err.message, color: "danger-alert" }),
      });
    }
  };

  return (
    <>
      <CButton className={className} onClick={() => setVisible(true)}>
        <CIcon icon={cilTrash} className="text-white" />
      </CButton>

      <CModal
        backdrop="static"
        visible={visible}
        onClose={() => setVisible(false)}
        size="md"
      >
        <CModalHeader>
          <CModalTitle>{title || "DELETE"}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {message || "Do you really want to delete this?"}
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setVisible(false)}
            disabled={isLoading}
          >
            No
          </CButton>
          <CButton
            color="danger"
            onClick={() => onDelete()}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "yes"}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default AppDeleteButton;
