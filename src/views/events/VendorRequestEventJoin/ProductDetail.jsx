import React, { useEffect, useState, useCallback } from "react";
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
import {
  cilSettings,
  cilMinus,
  cilPlus,
  cilLibraryAdd,
  cilPlaylistAdd,
  cilCheckCircle,
} from "@coreui/icons";
import { getProducts } from "src/context/ProductContext/service";
import { useNavigate, useParams } from "react-router-dom";
import ProductModal from "../../product/ProductModal";
import { useAppDispatch, useAppState } from "src/context/AppContext";
import {
  updateJoinedEvent,
  vendorJoinedEvent,
} from "src/context/EventContext/service";
import { AppToast } from "src/components/AppToast";

const ProductDetail = ({ joined_event_id, eventProducts, showLoading }) => {
  const { event_id, account_id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [dropDownProducts, setDropDownProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(showLoading);
  const [visible, setVisible] = useState(false);
  const { currentUser } = useAppState();
  const app_dispatch = useAppDispatch();
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
      const datanew = {
        product_id: product?._id,
        product_name: product?.product_name,
        product_description: product?.product_description,
        product_quantity: product?.product_quantity || 1,
        product_rate: product?.product_price || 1,
        product_amount:
          (product?.product_quantity || 1) * (product?.product_price || 1),
      };
      setSelectedProducts([...selectedProducts, datanew]);
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
    setSelectedProducts(selectedProducts?.filter((ite, idx) => idx !== index));
  };

  const addNewProduct = (product) => {
    setProducts([product, ...products]);
    setDropDownProducts([
      { value: product?._id, label: product?.product_name },
      ...dropDownProducts,
    ]);
  };

  const saveProduct = () => {
    setIsLoading(true);
    const data = {
      event_id: event_id,
      account_id: currentUser?.data?._id,
      products: selectedProducts,
    };
    if (account_id) {
      data.joined_event_id = joined_event_id;
    }
    (account_id ? updateJoinedEvent(data) : vendorJoinedEvent(data))
      .then((response) => {
        setIsLoading(false);
        if (response.data.data) {
          app_dispatch({
            type: "SHOW_RESPONSE",
            toast: AppToast({
              message: response.data.message,
              color: "success-alert",
            }),
          });
          navigate("/event-list");
        } else {
          app_dispatch({
            type: "SHOW_RESPONSE",
            toast: AppToast({
              message: response.data.message,
              color: "danger-alert",
            }),
          });
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        app_dispatch({
          type: "SHOW_RESPONSE",
          toast: AppToast({
            message: err.response.data.message || err.message,
            color: "danger-alert",
          }),
        });
      });
  };

  useEffect(() => {
    if (joined_event_id) {
      setSelectedProducts(eventProducts);
    }
  }, [joined_event_id]);
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
                color="primary"
                shape="rounded-0"
                className="mt-2 text-white"
                onClick={addProduct}
                disabled={!selectedProduct || isLoading}
              >
                <CIcon icon={cilPlus} /> Add Product
              </CButton>
            </CCol>
            <CCol className="mt-4">
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <CButton
                  color="danger"
                  shape="rounded-0"
                  className="mt-2 me-md-2 text-white"
                  onClick={() => setVisible(true)}
                  style={{ float: "right" }}
                >
                  <CIcon icon={cilLibraryAdd} />
                  New Product
                </CButton>
                {/*        <CButton
                  color="info"
                  shape="rounded-0"
                  className="mt-2 text-white"
                  onClick={saveProduct}
                  disabled={selectedProducts?.length === 0 || isLoading}
                  style={{ float: "right" }}
                >
                  {isLoading ? (
                    <CSpinner />
                  ) : account_id ? (
                    "Update Product"
                  ) : (
                    "Save Product"
                  )}
                </CButton>*/}
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
                    <CTableRow key={index}>
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
                          name="product_quantity"
                          value={item?.product_quantity}
                          onChange={(event) =>
                            handleOnChangeProduct(
                              {
                                target: {
                                  name: "product_quantity",
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
                          <CIcon icon={cilMinus} className="text-white" />
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCol>
          </CRow>
          <CCol></CCol>
          <CRow>
            <CCol md={4}></CCol>
            <CCol md={8}>
              <CRow>
                <CCol md={9}></CCol>
                <CCol md={3}>
                  <div>
                    <h6 className="vendarH6Info">Total:</h6>
                    <span className="vendarSpanTotal">
                      {(selectedProducts || [])
                        ?.map((item) => {
                          return item.product_amount;
                        })
                        ?.reduce(
                          (preValue, nextValue) =>
                            (+preValue || 0) + (+nextValue || 0),
                          0
                        )}
                    </span>
                  </div>
                </CCol>
              </CRow>
              <hr />
            </CCol>
          </CRow>

          <CCol className="mt-4">
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <CButton
                color="success"
                shape="rounded-0"
                className="mt-2 text-white"
                onClick={saveProduct}
                disabled={selectedProducts?.length === 0 || isLoading}
                style={{ float: "right" }}
              >
                <CIcon icon={cilCheckCircle} />
                {isLoading ? (
                  <CSpinner />
                ) : account_id ? (
                  " Update Product"
                ) : (
                  " Save Product"
                )}
              </CButton>
            </div>
          </CCol>
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
