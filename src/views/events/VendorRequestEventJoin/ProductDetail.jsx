import React, { useEffect, useState } from "react";
import {
  CCol,
  CRow,
  CFormInput,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CSpinner,
  CFormTextarea,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
} from "@coreui/react";
import ReactSelect from "src/components/Inputs/ReactSelect";
import CIcon from "@coreui/icons-react";
import { cilSettings, cilMinus, cilPlus } from "@coreui/icons";
import { getProducts } from "src/context/ProductContext/service";
import { useParams } from "react-router-dom";
import ProductModal from "../../product/ProductModal";
import { useAppState } from "src/context/AppContext";

const ProductDetail = () => {
  const { event_id } = useParams();
  const [products, setProducts] = useState([]);
  const [dropDownProducts, setDropDownProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const { currentUser } = useAppState();

  const getVendorProducts = React.useCallback(() => {
    getProducts({ no_limit: true })
      .then((response) => {
        if (response.data.data) {
          setProducts(response.data.data.data);
          setDropDownProducts(
            response.data.data.data?.map((item) => {
              return { value: item?._id, label: item?.product_name };
            }) || []
          );
        } else {
          setProducts([]);
          setDropDownProducts([]);
        }
      })
      .catch((err) => {
        setDropDownProducts([]);
        setProducts([]);
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getVendorProducts();
  }, []);

  const addProduct = () => {
    if (selectedProduct) {
      const product = products.find((item) => item._id === selectedProduct);
      setSelectedProducts([
        ...selectedProducts,
        {
          product_id: product?._id,
          product_name: product?.product_name,
          product_description: product?.product_description,
          product_qty: product?.product_quantity || 1,
          product_rate: product?.product_price || 1,
          product_amount:
            (product?.product_quantity || 1) * (product?.product_price || 1),
        },
      ]);
      setSelectedProduct(null);
    }
  };

  const handleOnChangeProduct = (e, index) => {
    const { name, value } = e.target;
    setSelectedProducts(
      (selectedProducts || [])?.map((item, idx) => {
        if (idx === index) {
          return {
            ...item,
            [name]: value,
          };
        }
        return item;
      })
    );
  };

  const removeProduct = (index) => {
    setSelectedProducts(
      selectedProducts?.filter((ite, idx) => {
        return idx !== index;
      })
    );
  };

  const addNewProduct = (product) => {
    setProducts([product, ...products]);
    setDropDownProducts([
      { value: product?._id, label: product?.product_name },
      ...dropDownProducts,
    ]);
  };

  const saveProduct = () => {
    const data = {
      event_id: event_id,
      vendor_id: currentUser?.data?.user_detail?._id,
      account_id: currentUser?.data?._id,
      products: selectedProducts,
    };
    console.log(data);
  };

  return (
    <>
      <CCard className="mb-4 p-2">
        <CCardHeader>Add Products</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <ReactSelect
                options={dropDownProducts}
                handleChange={(e) => setSelectedProduct(e.target.value)}
                name="selectedProduct"
                label="Select Product"
                value={selectedProduct}
                placeholder="Select Product"
                id="selectedProduct"
              />
            </CCol>
            <CCol className="mt-4">
              <CButton
                color="info"
                shape="rounded-0"
                className="mt-2 text-white"
                onClick={addProduct}
                disabled={!selectedProduct || isLoading}
              >
                Add Product
              </CButton>
            </CCol>
            <CCol className="mt-4">
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <CButton
                  color="warning"
                  shape="rounded-0"
                  className="mt-2 me-md-2 text-white"
                  onClick={() => setVisible(true)}
                  style={{ float: "right" }}
                >
                  New Product
                </CButton>
                <CButton
                  color="info"
                  shape="rounded-0"
                  className="mt-2 text-white"
                  onClick={saveProduct}
                  disabled={selectedProducts?.length === 0 || isLoading}
                  style={{ float: "right" }}
                >
                  {isLoading ? <CSpinner /> : "Save Product"}
                </CButton>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Item</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Qty</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Rate</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      <CIcon icon={cilSettings} />
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {(selectedProducts || [])?.map((item, index) => (
                    <CTableRow key={item?._id}>
                      <CTableDataCell>
                        <CFormInput
                          name="product_name"
                          className="form-control"
                          rows="4"
                          placeholder="Item"
                          value={item?.product_name}
                          readOnly
                        ></CFormInput>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CFormTextarea
                          name="product_description"
                          className="form-control"
                          rows="4"
                          placeholder="Description"
                          value={item?.product_description}
                          onChange={(event) =>
                            handleOnChangeProduct(
                              {
                                target: {
                                  name: "product_description",
                                  value: event.target.value,
                                },
                              },
                              index
                            )
                          }
                        ></CFormTextarea>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CFormInput
                          type="number"
                          id="qty"
                          text="Unit"
                          name="product_qty"
                          value={item?.product_qty}
                          onChange={(event) =>
                            handleOnChangeProduct(
                              {
                                target: {
                                  name: "product_qty",
                                  value: event.target.value,
                                },
                              },
                              index
                            )
                          }
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <CFormInput
                          type="number"
                          id="rate"
                          text="Rate"
                          name="product_rate"
                          value={item?.product_rate}
                          onChange={(event) =>
                            handleOnChangeProduct(
                              {
                                target: {
                                  name: "product_rate",
                                  value: event.target.value,
                                },
                              },
                              index
                            )
                          }
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <CFormInput
                          type="number"
                          id="amount"
                          text="Amount"
                          name="product_amount"
                          value={item?.product_amount}
                          onChange={(event) =>
                            handleOnChangeProduct(
                              {
                                target: {
                                  name: "product_amount",
                                  value: event.target.value,
                                },
                              },
                              index
                            )
                          }
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          type="button"
                          size="sm"
                          className="btn btn-warning"
                          onClick={() => removeProduct(index)}
                        >
                          {/* {index === 0 ? (
                          <CIcon icon={cilPlus} className="text-white" />
                        ) : ( */}
                          <CIcon icon={cilMinus} className="text-white" />
                          {/* )} */}
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <ProductModal
        setVisible={() => setVisible(false)}
        visible={visible}
        addNewProduct={addNewProduct}
      />
    </>
  );
};

export default ProductDetail;
