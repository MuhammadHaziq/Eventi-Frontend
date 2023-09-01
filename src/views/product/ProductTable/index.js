import React, { useState, useEffect } from "react";
import { CSmartTable, CSmartPagination } from "@coreui/react-pro";
import AppDeleteButton from "src/components/AppDeleteButton";
import AppEditButton from "src/components/AppEditButton";
import { deleteProduct } from "src/context/ProductContext/service";
import useDebounce from "src/hooks/useDebounce";
import { CImage } from "@coreui/react";
const ProductTable = ({
  isLoading,
  products,
  tableMeta,
  updateFilter,
  clickOnEdit,
  clickHideModal,
}) => {
  const [fields, setFields] = useState([]);
  const [currentPage, setActivePage] = useState(tableMeta?.page || 1);
  const [tableFilters, setTableFilter] = useState(null);
  const tableFilterDebounce = useDebounce(tableFilters, 300);

  useEffect(() => {
    if (tableFilterDebounce && Object.keys(tableFilterDebounce)?.length > 0) {
      const tableFilter = JSON.stringify(tableFilters);
      updateFilter({ tableFilters: tableFilter });
    }
  }, [tableFilterDebounce]);

  const [columns] = useState([
    {
      key: "Image",
      label: "Image",
      filter: false,
      isShow: true,
      disabled: false,
    },
    {
      key: "product_name",
      label: "Name",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "product_points",
      label: "Point",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "productPrice",
      label: "Price",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "product_quantity",
      label: "Quantity",
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
        items={products}
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
          Image: (item) => (
            <td>
              {item?.product_images?.length > 0 ? (
                <CImage
                  src={`${process.env.REACT_APP_API_ENDPOINT}/media/productImage/${item?._id}/${item?.product_images[0]}`}
                  width={"50px"}
                  height={"50px"}
                />
              ) : (
                <CImage
                  src={`./images/no_image_found.png`}
                  width={"50px"}
                  height={"50px"}
                />
              )}
            </td>
          ),
          Action: (item) => (
            <td>
              <div className="d-flex gap-2">
                <AppEditButton onClick={clickOnEdit} edit_id={item._id} />

                <AppDeleteButton
                  title="Delete Product"
                  message="Do you really want to delete this product?"
                  delete_id={item._id}
                  apiUrl={deleteProduct}
                  clickOnDelete={clickHideModal}
                />
              </div>
            </td>
          ),
          productPrice: (item) => (
            <td>
              {item.product_price+" "+"NGN"}
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
export default ProductTable;
