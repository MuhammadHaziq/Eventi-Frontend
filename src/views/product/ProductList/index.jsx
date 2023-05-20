import React, { useEffect, useState } from "react";
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

export const ProductList = () => {
  const { products } = useProductAppState();
  const dispatch = useProductAppDispatch();
  const [visible, setVisible] = useState(false);
  const [selectProduct, setSelectedProduct] = useState("");

  const getAllProducts = () => {
    try {
      getProducts()
        .then((response) => {
          dispatch({ type: "GET_PRODUCTS", products: response.data.data });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

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
              <CTable hover>
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
                  {(products || [])?.map((item, index) => (
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
              </CTable>
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
