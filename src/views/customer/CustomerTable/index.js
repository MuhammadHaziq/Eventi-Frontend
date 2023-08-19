import React, { useState, useEffect } from "react";
import { CSmartTable, CSmartPagination } from "@coreui/react-pro";
import AppDeleteButton from "src/components/AppDeleteButton";
import AppEditButton from "src/components/AppEditButton";
import useDebounce from "src/hooks/useDebounce";
import { deleteCustomer } from "src/context/CustomerContext/service";
import { useAppState } from "src/context/AppContext";
const CustomerTable = ({
  isLoading,
  customers,
  tableMeta,
  updateFilter,
  clickOnEdit,
  clickOnUpdatePoints,
  clickHideModal,
}) => {
  const [fields, setFields] = useState([]);
  const [currentPage, setActivePage] = useState(tableMeta?.page || 1);
  const [tableFilters, setTableFilter] = useState(null);
  const tableFilterDebounce = useDebounce(tableFilters, 300);
  const { permissions } = useAppState();

  useEffect(() => {
    if (tableFilterDebounce && Object.keys(tableFilterDebounce)?.length > 0) {
      const tableFilter = JSON.stringify(tableFilters);
      updateFilter({ tableFilters: tableFilter });
    }
  }, [tableFilterDebounce]);

  const [columns] = useState([
    {
      key: "first_name",
      label: "First Name",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "last_name",
      label: "Last Name",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "email",
      label: "Email",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "points_available",
      label: "Points Available",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "gender",
      label: "Gender",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "date_of_birth",
      label: "Date Of Birth",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "phone_number",
      label: "Mob Number",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "Action",
      label: "Action",
      filter: false,
      isShow: true,
      disabled: false,
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
        items={customers}
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
        // onItemsPerPageChange={(itemsPerPage) => {
        //   //   setActivePage(1);
        //   updateFilter({ perPage: itemsPerPage });
        // }}
        onSorterChange={(sorter) => {
          updateFilter({ sort: JSON.stringify(sorter) });
        }}
        scopedColumns={{
          Action: (item) => (
            <td>
              <div className="d-flex gap-2">
                {permissions?.find(
                  (item) => item.permission === "customer-edit"
                ) && (
                  <>
                  <AppEditButton
                    onClick={clickOnUpdatePoints}
                    edit_id={item.account_id}
                  />
                  <AppEditButton
                    onClick={clickOnEdit}
                    edit_id={item.account_id}
                  />
                  </>
                )}
                {permissions?.find(
                  (item) => item.permission === "customer-delete"
                ) && (
                  <AppDeleteButton
                    title="Delete Customer"
                    message="Do you really want to delete this customer?"
                    delete_id={item.account_id}
                    apiUrl={deleteCustomer}
                    clickOnDelete={clickHideModal}
                  />
                )}
              </div>
            </td>
          ),
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
export default CustomerTable;
