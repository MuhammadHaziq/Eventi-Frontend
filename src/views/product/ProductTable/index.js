import React, { useState, useEffect } from "react";
// import { CDataTable, CPagination } from "@coreui/react";
import { CSmartTable, CSmartPagination } from "@coreui/react-pro";

const ProductTable = ({ isLoading, products, tableMeta }) => {
  const [fields, setFields] = useState([]);
  const [columns] = useState([
    {
      key: "_id",
      label: "#",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "product_name",
      label: "Product Name",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "product_price",
      label: "Product Price",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "product_quantity",
      label: "Product Qty",
      filter: true,
      isShow: true,
      disabled: false,
    },
  ]);
  useEffect(() => {
    if (columns.length > 0) {
      setFields(columns.filter((itm) => itm.isShow));
    }
  }, [columns]);
  console.log(tableMeta, "tableMeta");
  return (
    <>
      <CSmartTable
        columns={columns}
        loading={isLoading}
        items={products}
        fields={fields}
        itemsPerPage={tableMeta?.take || 10}
        sorter
        hover
        outlined
        tableProps={{
          hover: true,
          responsive: true,
        }}
        pagination={{
          external: true,
        }}
        // paginationProps={{
        //   activePage: activePage,
        //   pages: Math.ceil(records / itemsPerPage) || 1,
        // }}
        columnFilter={{
          external: true,
        }}
        columnSorter={{
          external: true,
        }}
        // onActivePageChange={(activePage) => setActivePage(activePage)}
        // onColumnFilterChange={(filter) => {
        //   setActivePage(1)
        //   setColumnFilter(filter)
        // }}
        // onItemsPerPageChange={(itemsPerPage) => {
        //     setActivePage(1)
        //     setItemsPerPage(itemsPerPage)
        //   }}
        //   onSorterChange={(sorter) => setColumnSorter(sorter)}
      />
      {+tableMeta?.pageCount > 1 && (
        <div className={"mt-2"}>
          <CSmartPagination
            align="end"
            activePage={1}
            pages={tableMeta?.pageCount}
            // onActivePageChange={(i) => {
            //   setActivePage(i);
            //   updateFilter({ page: i });
            // }}
          />
        </div>
      )}
    </>
  );
};
export default ProductTable;
