import React, { useCallback, useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
} from "@coreui/react";
import { getProducts } from "src/context/ProductContext/service";
import {
  useProductAppState,
  useProductAppDispatch,
} from "src/context/ProductContext";
import ProductModal from "../ProductModal";
import AppDeleteButton from "src/components/AppDeleteButton";
import AppEditButton from "src/components/AppEditButton";
import { deleteProduct } from "src/context/ProductContext/service";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "src/context/AppContext";
import { AppToast } from "src/components/AppToast";
import ProductTable from "../ProductTable";
export const ProductList = () => {
  const { products } = useProductAppState();
  const dispatch = useProductAppDispatch();
  const app_dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);
  const [selectProduct, setSelectedProduct] = useState("");
  const [filters, setFilters] = useState({ page: 1, perPage: 10 });

  const { data, error, isFetching, isLoading, isError } = useQuery(
    ["Porudcts", filters],
    () => filters && getProducts(filters),
    {
      onError: (error) => {
        app_dispatch({
          type: "SHOW_MESSAGE",
          toast: AppToast({
            message: error.response.data.message,
            color: "dangar-alert",
          }),
        });
      },
      keepPreviousData: false,
      staleTime: 5000,
      retryOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  const clickOnEdit = (id) => {
    setSelectedProduct(id);
    setVisible(true);
  };

  const clickHideModal = () => {
    setSelectedProduct("");
    setVisible(false);
  };

  return (
    <>
      <CButton onClick={() => setVisible(!visible)}>Add Product</CButton>
      <br></br>
      <br></br>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Product List</strong>
            </CCardHeader>
            <CCardBody>
              {/* <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      Product Name
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Qty</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {(data?.data?.data?.data || [])?.map((item, index) => (
                    <CTableRow key={item._id}>
                      <CTableHeaderCell scope="row">
                        {index + 1}
                      </CTableHeaderCell>
                      <CTableDataCell>{item.product_name}</CTableDataCell>
                      <CTableDataCell>$ {item.product_price}</CTableDataCell>
                      <CTableDataCell>{item.product_quantity}</CTableDataCell>
                      <CTableDataCell>
                        <div className="d-flex gap-2">
                          <AppDeleteButton
                            title="Delete Product"
                            message="Do you really want to delete this product?"
                            delete_id={item._id}
                            apiUrl={deleteProduct}
                          />
                          <AppEditButton
                            onClick={clickOnEdit}
                            edit_id={item._id}
                          />
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable> */}
              <ProductTable
                products={data?.data?.data?.data || []}
                isLoading={isLoading}
                tableMeta={data?.data?.data?.meta || []}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {visible && (
        <ProductModal
          setVisible={clickHideModal}
          visible={visible}
          product_id={selectProduct}
        />
      )}
    </>
  );
};
