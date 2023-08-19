import { cilPlaylistAdd } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton } from "@coreui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppState } from "src/context/AppContext";

const AppEventJoinButton = ({ item, icon = false }) => {
  const { currentUser } = useAppState();
  const navigate = useNavigate();
  return (
    <div className="d-grid gap-2">
      <CButton
        onClick={() =>
          navigate(
            currentUser?.data?.user_type === "vendor"
              ? item.joined_vendors
                  ?.map((ite) => ite?.vendor_id)
                  ?.includes(currentUser?.data?._id)
                ? `/vendor-update-event/${currentUser?.data?._id}/${item?._id}`
                : `/vendor-join-event/${item?._id}`
              : currentUser?.data?.user_type === "admin"
              ? `/event-detail/${currentUser?.data?._id}/${item?._id}`
              : `/join-event/${currentUser?.data?._id}/${item?._id}`
          )
        }
        title={
          currentUser?.data?.user_type === "vendor"
            ? item[
                currentUser?.data?.user_type === "vendor"
                  ? "joined_vendors"
                  : "joined_customers"
              ]
                ?.map(
                  (ite) =>
                    ite?.[
                      currentUser?.data?.user_type === "vendor"
                        ? "vendor_id"
                        : "customer_id"
                    ]
                )
                ?.includes(currentUser?.data?._id)
              ? currentUser?.data?.user_type === "vendor"
                ? "Update Event"
                : "Un Join Event"
              : "Request To Join Event Approved"
            : "View Detail"
        }
        update_event={
          item[
            currentUser?.data?.user_type === "vendor"
              ? "joined_vendors"
              : "joined_customers"
          ]
            ?.map(
              (ite) =>
                ite?.[
                  currentUser?.data?.user_type === "vendor"
                    ? "vendor_id"
                    : "customer_id"
                ]
            )
            ?.includes(currentUser?.data?._id)
            ? 1
            : 0
        }
        color={
          item[
            currentUser?.data?.user_type === "vendor"
              ? "joined_vendors"
              : "joined_customers"
          ]
            ?.map(
              (ite) =>
                ite?.[
                  currentUser?.data?.user_type === "vendor"
                    ? "vendor_id"
                    : "customer_id"
                ]
            )
            ?.includes(currentUser?.data?._id)
            ? "warning"
            : "primary"
        }
        size={icon ? "sm" : "md"}
      >
        {icon ? (
          <CIcon icon={cilPlaylistAdd} className="text-white" />
        ) : currentUser?.data?.user_type !== "admin" ? (
          item[
            currentUser?.data?.user_type === "vendor"
              ? "joined_vendors"
              : "joined_customers"
          ]
            ?.map(
              (ite) =>
                ite?.[
                  currentUser?.data?.user_type === "vendor"
                    ? "vendor_id"
                    : "customer_id"
                ]
            )
            ?.includes(currentUser?.data?._id) ? (
            // "Event Joined"
            "View Detail"
          ) : (
            "View Detail"
            // "Request to join Event"
          )
        ) : (
          "View Detail"
        )}
      </CButton>
    </div>
  );
};

export default AppEventJoinButton;
