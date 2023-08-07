import React, { useEffect, useState } from "react";
import { useAppState } from "src/context/AppContext";
const { CSmartTable } = require("@coreui/react-pro");

const JoinedCustomers = ({ joinedCustomers = [] }) => {
  const [customers, setCustomers] = useState([]);
  const { currentUser } = useAppState();

  let columns = [
    { key: "first_name" },
    { key: "last_name" },
    { key: "email" },
    { key: "phone_number" },
  ];

  useEffect(() => {
    if (joinedCustomers && joinedCustomers?.length > 0) {
      setCustomers(
        joinedCustomers
          ?.filter((ite) => ite?.customer_id?._id !== currentUser?.data?._id)
          ?.map((item) => {
            return { ...item.customer_id, ...item };
          })
      );
    }
  }, [joinedCustomers]);

  return (
    <CSmartTable
      activePage={3}
      columns={columns}
      columnFilter
      columnSorter
      items={customers}
      itemsPerPage={5}
      pagination
      tableProps={{
        striped: true,
        hover: true,
      }}
    />
  );
};
export default JoinedCustomers;
