import React, { useState, useEffect } from "react";
import { CSmartTable, CSmartPagination } from "@coreui/react-pro";
import AppDeleteButton from "src/components/AppDeleteButton";
import AppEditButton from "src/components/AppEditButton";
import AppReqFormButton from "src/components/AppReqFormButton";
import useDebounce from "src/hooks/useDebounce";
import { dateFormat } from "src/utils/dateFormat";
import { deleteEvent } from "src/context/EventContext/service";
import { useAppState } from "src/context/AppContext";
import { useNavigate } from "react-router-dom";
const EventTable = ({
  isLoading,
  events,
  tableMeta,
  updateFilter,
  clickOnEdit,
  clickHideModal,
}) => {
  const [fields, setFields] = useState([]);
  const [currentPage, setActivePage] = useState(tableMeta?.page || 1);
  const [tableFilters, setTableFilter] = useState(null);
  const tableFilterDebounce = useDebounce(tableFilters, 300);
  const { permissions } = useAppState();
  const navigate = useNavigate();
  useEffect(() => {
    if (tableFilterDebounce && Object.keys(tableFilterDebounce)?.length > 0) {
      const tableFilter = JSON.stringify(tableFilters);
      updateFilter({ tableFilters: tableFilter });
    }
  }, [tableFilterDebounce]);

  const [columns] = useState([
    {
      key: "Action",
      label: "Action",
      filter: false,
      isShow: true,
      disabled: false,
    },
    {
      key: "event_name",
      label: "Event Name",
      filter: true,
      isShow: true,
      disabled: false,
      _style: { minWidth: "130px" },
    },
    {
      key: "event_location",
      label: "Event Location",
      filter: true,
      isShow: true,
      disabled: false,
      _style: { minWidth: "130px" },
    },
    {
      key: "Event_date",
      label: "Event Date",
      filter: false,
      isShow: true,
      disabled: false,
      _style: { minWidth: "130px" },
    },
    {
      key: "type_of_event",
      label: "Type Of Event",
      filter: true,
      isShow: true,
      disabled: false,
      _style: { minWidth: "130px" },
    },
    {
      key: "phone_number",
      label: "Phone Number",
      filter: true,
      isShow: true,
      disabled: false,
    },

    {
      key: "expected_attendence",
      label: "Expected Attendance",
      filter: true,
      isShow: true,
      disabled: false,
    },

    {
      key: "security",
      label: "Security",
      filter: false,
      isShow: true,
      disabled: false,
    },
    {
      key: "special_request",
      label: "Special Request",
      filter: true,
      isShow: true,
      disabled: false,
      _style: { minWidth: "130px" },
    },
    {
      key: "Created_At",
      label: "Created Date",
      filter: false,
      isShow: true,
      disabled: false,
      _style: { minWidth: "130px" },
    },
  ]);
  useEffect(() => {
    if (columns.length > 0) {
      setFields(columns.filter((itm) => itm.isShow));
    }
  }, [columns]);

  return (
    <>
      <CSmartTable
        columns={columns}
        loading={isLoading}
        items={events}
        fields={fields}
        itemsPerPage={tableMeta?.take}
        itemsPerPageSelect
        sorter={"true"}
        hover={"true"}
        outlined={"true"}
        tableProps={{
          hover: true,
          responsive: true,
        }}
        columnFilter={{
          external: true,
        }}
        columnSorter={{
          external: true,
        }}
        onColumnFilterChange={(e) => {
          Object.keys(e)?.length > 0 && setTableFilter(e);
        }}
        onSorterChange={(sorter) => {
          updateFilter({ sort: JSON.stringify(sorter) });
        }}
        scopedColumns={{
          Action: (item) => (
            <td>
              <div className="d-flex gap-2">
                {permissions?.find(
                  (item) => item.permission === "event-delete"
                ) && (
                  <AppDeleteButton
                    title="Delete Event"
                    message="Do you really want to delete this event?"
                    delete_id={item._id}
                    apiUrl={deleteEvent}
                    clickOnDelete={clickHideModal}
                  />
                )}
                {permissions?.find(
                  (item) => item.permission === "event-edit"
                ) && <AppEditButton onClick={clickOnEdit} edit_id={item._id} />}
                <AppReqFormButton
                  onClick={() => navigate(`/vendor-join-event/${item?._id}`)}
                  title="Vendor Request To Join Event"
                />
              </div>
            </td>
          ),
          Event_date: (item) => <td>{dateFormat(item.event_date)}</td>,
          Created_At: (item) => <td>{dateFormat(item.createdAt)}</td>,
        }}
      />
      {+tableMeta?.pageCount > 1 && (
        <div className={"mt-2"}>
          <CSmartPagination
            align="start"
            activePage={currentPage}
            pages={tableMeta?.pageCount}
            onActivePageChange={(i) => {
              setActivePage(i);
              updateFilter({ page: i });
            }}
          />
        </div>
      )}
    </>
  );
};
export default EventTable;
