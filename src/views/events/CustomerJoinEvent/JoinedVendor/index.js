import { CButton } from "@coreui/react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
const { CSmartTable } = require("@coreui/react-pro");

const JoinedVendors = ({ joinedVendors = [] }) => {
  const { event_id } = useParams();
  const navigate = useNavigate();
  const columns = [
    { key: "first_name" },
    { key: "last_name" },
    { key: "email" },
    { key: "phone_number" },
    { key: "show_detail", label: "Detail" },
  ];

  return (
    <CSmartTable
      activePage={3}
      columns={columns}
      columnFilter
      columnSorter
      items={joinedVendors}
      itemsPerPage={5}
      pagination
      tableProps={{
        striped: true,
        hover: true,
      }}
      scopedColumns={{
        show_detail: (item) => {
          return (
            <td className="py-2">
              <CButton
                color="primary"
                variant="outline"
                shape="square"
                size="sm"
                onClick={() =>
                  navigate(`/joined-vednor-detail/${item?._id}/${event_id}`)
                }
              >
                Detail
              </CButton>
            </td>
          );
        },
      }}
    />
  );
};
export default JoinedVendors;
