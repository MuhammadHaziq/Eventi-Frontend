import React, { useState, useEffect } from "react";
import { CSmartTable, CSmartPagination } from "@coreui/react-pro";
import {
  CCol,
  CRow,
  CCard,
  CCardBody,
  CCardHeader,
  CContainer,
  CButton,
} from "@coreui/react";

const CustomerPayment = () => {
  const [fields, setFields] = useState([]);

  const [columns] = useState([
    {
      key: "event_name",
      label: "Event Name",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "amount",
      label: "Amount",
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
      <CRow>
        <CCol>
          <CCard className="mb-2">
            <CCardHeader className="d-flex justify-content-between">
              <strong>
                <h5>Payment History</h5>
              </strong>
            </CCardHeader>
            <CCardBody>
              <CSmartTable
                columns={columns}
                loading={false}
                //   items={customers}
                fields={fields}
                //   itemsPerPage={tableMeta?.take}
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
                scopedColumns={{}}
              />
              {/*   {+tableMeta?.pageCount > 1 && (
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
      )} */}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default CustomerPayment;
