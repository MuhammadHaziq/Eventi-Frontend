import React from "react";
const { CSmartTable } = require("@coreui/react-pro");

const JoinedCustomers = ({ joinedCustomers = [] }) => {
  const columns = [
    {
      key: "first_name",
    },
    {
      key: "last_name",
    },
    { key: "email" },
    { key: "phone_number" },
  ];

  return (
    <CSmartTable
      activePage={3}
      columns={columns}
      columnFilter
      columnSorter
      items={joinedCustomers}
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
