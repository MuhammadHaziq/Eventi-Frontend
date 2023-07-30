import React, { useState, useEffect } from "react";
import { CButton } from "@coreui/react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminEventStatuses } from "src/utils/constants";
const { CSmartTable } = require("@coreui/react-pro");

const JoinedVendors = ({ joinedVendors = [] }) => {
  const { event_id } = useParams();
  const [vendors, setVendors] = useState([]);
  const navigate = useNavigate();
  const columns = [
    { key: "first_name" },
    { key: "last_name" },
    { key: "email" },
    { key: "phone_number" },
    { key: "event_status", label: "Event Status" },
    { key: "show_detail", label: "Detail" },
  ];

  useEffect(() => {
    if (joinedVendors && joinedVendors?.length > 0) {
      setVendors(
        joinedVendors?.map((item) => {
          return { ...item.vendor_id, ...item };
        })
      );
    }
  }, [joinedVendors]);

  return (
    <CSmartTable
      activePage={3}
      columns={columns}
      columnFilter
      columnSorter
      items={vendors}
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
                  navigate(
                    `/joined-vednor-detail/${item?.vendor_id?._id}/${event_id}`
                  )
                }
              >
                Detail
              </CButton>
            </td>
          );
        },
        event_status: (item) => {
          return (
            <td className="py-2">{AdminEventStatuses(item?.event_status)}</td>
          );
        },
      }}
    />
  );
};
export default JoinedVendors;
