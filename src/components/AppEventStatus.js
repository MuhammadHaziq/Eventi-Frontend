import React from "react";
import { useAppState } from "src/context/AppContext";

const AppEventStatus = ({ item }) => {
  const { currentUser } = useAppState();

  return (
    <td>
      {currentUser?.data?.user_type !== "admin"
        ? item[
            currentUser?.data?.user_type === "vendor"
              ? "joined_vendors"
              : "joined_customers"
          ]?.filter(
            (ite) =>
              ite?.[
                currentUser?.data?.user_type === "vendor"
                  ? "vendor_id"
                  : "customer_id"
              ] === currentUser?.data?._id
          )?.[0]?.event_status || "Pending"
        : null}
    </td>
  );
};

export default AppEventStatus;
