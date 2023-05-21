import React, { useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
} from "@coreui/react";
import { getProducts } from "src/context/ProductContext/service";
import ProductModal from "../ProductModal";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "src/context/AppContext";
import { AppToast } from "src/components/AppToast";
import ProductTable from "../ProductTable";
import AppProgress from "src/components/AppProgress";

export const ProductList = () => {
  const app_dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);
  const [selectProduct, setSelectedProduct] = useState("");
  const [filters, setFilters] = useState();

  const { data, error, isFetching, isLoading, isError } = useQuery(
    ["Porudcts", filters],
    () => getProducts(filters),
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

  const useGetData = (filterDatas) => {
    setFilters({ ...filters, ...filterDatas });
  };

  const clickOnEdit = (id) => {
    setSelectedProduct(id);
    setVisible(true);
  };

  const clickHideModal = () => {
    setSelectedProduct("");
    setVisible(false);
    setFilters({ ...filters, update: !filters?.update });
  };

  return (
    <>
      {isError ? "" : <AppProgress loading={isFetching} />}
      <CButton onClick={() => setVisible(!visible)}>Add Product</CButton>
      <br></br>
      <br></br>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>
                Product List ({data?.data?.data?.meta?.itemCount})
              </strong>
            </CCardHeader>
            <CCardBody>
              <ProductTable
                products={data?.data?.data?.data || []}
                isLoading={isLoading}
                tableMeta={data?.data?.data?.meta || null}
                updateFilter={useGetData}
                clickOnEdit={clickOnEdit}
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
