import { cilPlaylistAdd } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton } from "@coreui/react";
import React from "react";
import { useAppState } from "src/context/AppContext";

const AppEventJoinButton = ({ item, icon = false }) => {
  const { currentUser } = useAppState();
  return (
    <CButton
      onClick={() =>
        currentUser?.data?.user_type === "vendor"
          ? navigate(
              item.joined_vendors.includes(currentUser?.data?._id)
                ? `/vendor-update-event/${currentUser?.data?._id}/${item?._id}`
                : `/vendor-join-event/${item?._id}`
            )
          : null
      }
      title={
        item[
          currentUser?.data?.user_type === "vendor"
            ? "joined_vendors"
            : "joined_customers"
        ].includes(currentUser?.data?._id)
          ? currentUser?.data?.user_type === "vendor"
            ? "Update Event"
            : "Un Join Event"
          : "Request To Join Event"
      }
      update_event={item[
        currentUser?.data?.user_type === "vendor"
          ? "joined_vendors"
          : "joined_customers"
      ].includes(currentUser?.data?._id)}
      className="mt-3"
      color={
        item[
          currentUser?.data?.user_type === "vendor"
            ? "joined_vendors"
            : "joined_customers"
        ].includes(currentUser?.data?._id)
          ? "warning"
          : "primary"
      }
    >
      {icon ? (
        <CIcon icon={cilPlaylistAdd} className="text-white" />
      ) : (
        "Request to join Event"
      )}
    </CButton>
  );
};

export default AppEventJoinButton;
