import React, { useEffect, useState } from "react";
import {
  CCol,
  CRow,
  CFormInput,
  CButton,
  CBadge,
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
  CImage,
} from "@coreui/react";
import ReactSelect from "src/components/Inputs/ReactSelect";
import CIcon from "@coreui/icons-react";
import {
  cilSettings,
  cilMinus,
  cilPlus,
  cilLibraryAdd,
  cilCheckCircle,
} from "@coreui/icons";
import { getProducts } from "src/context/ProductContext/service";
import { useNavigate, useParams } from "react-router-dom";
import ProductModal from "src/views/product/ProductModal";
import PaymentModel from "src/components/Payment";
import { useAppDispatch, useAppState } from "src/context/AppContext";
import {
  approvedVendorJoinEvent,
  updateJoinedEvent,
  updateJoinedVendorEvent,
  vendorJoinedEvent,
} from "src/context/EventContext/service";
import { AppToast } from "src/components/AppToast";
import { EventStatuses, UserRequestEventStatuses } from "src/utils/constants";
import { vendorDropDown } from "src/context/AppContext/service";

const ProductDetail = ({
  isAdmin,
  setReload,
  joined_event_id,
  eventProducts,
  showLoading,
  vendorEventStatus,
  setVendorEventStatus,
  eventDetail,
  productImages,
  setProductImages,
}) => {
  const { event_id, account_id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [dropDownProducts, setDropDownProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(showLoading);
  const [isLoadingproducts, setIsLoadingProducts] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [vendor, setVendor] = useState("");
  const [vendors, setVendors] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visiblePaymentModel, setVisiblePaymentModel] = useState(false);
  const { currentUser } = useAppState();
  const app_dispatch = useAppDispatch();

  const restForm = () => {
    setVendor("")
    setSelectedVendor("")
    setSelectedProduct(null)
    setSelectedProducts([])
  }

  const getVendorProducts = React.useCallback((data) => {
    getProducts({ no_limit: true, ...data })
      .then((response) => {
        if (response.data.data) {
          const result = response.data.data.data;
          setProducts(result);
          setDropDownProducts(
            result?.map((item) => {
              return { value: item?._id, label: item?.product_name };
            }) || []
          );
        } else {
          setProducts([]);
          setDropDownProducts([]);
        }
        setIsLoadingProducts(false)
      })
      .catch((err) => {
        setIsLoadingProducts(false)
        setDropDownProducts([]);
        setProducts([]);
      });
  }, []);
  const toggleModel = async () => {
    setVisiblePaymentModel(!visiblePaymentModel);
  };
  const getAllVendors = async () => {
    const response = await vendorDropDown();
    if (response?.status) {
      setVendors(response?.data);
    } else {
      console.log("getAllVendors", response);
    }
  };
  useEffect(() => {
    if (!isAdmin) {
      getVendorProducts();
    } else {
      getAllVendors();
    }
  }, []);
  useEffect(() => {
    if (isAdmin && selectedVendor) {
      const vendorFound = vendors.find(item => item.account_id === selectedVendor)
      if(vendorFound){
        setVendor(vendorFound)
      }
      setIsLoadingProducts(true)
      getVendorProducts({ join_vendor_id: selectedVendor });
    }
  }, [selectedVendor]);

  const addProduct = () => {
    if (selectedProduct) {
      const product = products.find((item) => item._id === selectedProduct);
      const productIndex = selectedProducts.findIndex((item) => item.product_id === selectedProduct);
      
      if(product && productIndex === -1){
        const datanew = {
          product_id: product?._id,
          product_name: product?.product_name,
          product_description: product?.product_description,
          product_quantity: 1,
          product_rate: product?.product_price || 1,
          product_amount: 1 * (product?.product_price || 1),
        };
        setSelectedProducts([...selectedProducts, datanew]);
        setProductImages([
          ...productImages,
          { _id: product?._id, productImages: product?.productImages || [] },
        ]);
      } else {
        let shadowProducts = selectedProducts
        shadowProducts[productIndex] = {
          ...shadowProducts[productIndex],
          product_quantity: shadowProducts[productIndex]?.product_quantity + 1,
          product_amount: (shadowProducts[productIndex]?.product_quantity + 1) * (product?.product_price || 1),
        }
        setSelectedProducts(shadowProducts);
      }
      setSelectedProduct(null);
    }
  };

  const handleOnChangeProduct = (e, index) => {
    const { name, value } = e.target;
    setSelectedProducts(
      (selectedProducts || [])?.map((item, idx) => {
        if (idx === index) {
          return name === "product_quantity" ? {
            ...item,
            [name]: value,
            product_amount: value * item?.product_rate,
          } : name === "product_rate" ? {
            ...item,
            [name]: value,
            product_amount: value * item?.product_quantity,
          } : {
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
      status: UserRequestEventStatuses(vendorEventStatus) || "Request To Join",
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
          if (!account_id) {
            navigate("/event-list");
          }
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

  const refTranIDFuction = () => {
    setVisiblePaymentModel(true);
  };

  // const updateEvent = () => {
  //   const data = {
  //     // refTranID: refTranID,
  //     event_id: event_id,
  //     account_id: currentUser?.data?._id,
  //     status: UserRequestEventStatuses(vendorEventStatus) || "Request To Join",
  //   };
  //   setIsLoading(true);

  //   updateJoinedVendorEvent(data)
  //     .then((response) => {
  //       setIsLoading(false);
  //       if (response?.data?.data?.modifiedCount) {
  //         setVendorEventStatus(UserRequestEventStatuses(vendorEventStatus));
  //       }
  //       app_dispatch({
  //         type: "SHOW_RESPONSE",
  //         toast: AppToast({
  //           message: response.data.message,
  //           color: "success-alert",
  //         }),
  //       });
  //     })
  //     .catch((err) => {
  //       setIsLoading(false);

  //       app_dispatch({
  //         type: "SHOW_RESPONSE",
  //         toast: AppToast({
  //           message: err.response.data.message || err.message,
  //           color: "danger-alert",
  //         }),
  //       });
  //     });
  // };

  useEffect(() => {
    if (joined_event_id) {
      setSelectedProducts(eventProducts);
    }
  }, [joined_event_id]);

  const getFirstImage = (productId, imageObject) => {
    return imageObject?.filter((ite) => ite?._id === productId)?.[0]
      ?.product_images?.[0];
  };

  const approvedEventStatus = (data) => {
    setIsLoading(true);
    approvedVendorJoinEvent(event_id, account_id, data)
      .then((response) => {
        if (response.data.data) {
          setReload(true);
          restForm();
          setVendorEventStatus(UserRequestEventStatuses(vendorEventStatus));
          app_dispatch({
            type: "SHOW_RESPONSE",
            toast: AppToast({
              message: response.data.message,
              color: "success-alert",
            }),
          });
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
          toast: AppToast({ message: err.message, color: "danger-alert" }),
        });
      });
  };

  return (
    <>
      <CCard className="mb-4 p-2">
        <CCardHeader className="text-start pointer-cursor">
          Add Products{" "}
          <div className="d-grid d-md-flex justify-content-md-end">
            <CBadge
              color="danger"
              
              className="text-white"
              onClick={() => setVisible(true)}
              style={{ float: "right", marginTop: "-20px" }}
            >
              <CIcon icon={cilLibraryAdd} />
              <span className="m-1">New Product</span>
            </CBadge>
          </div>
        </CCardHeader>
        <CCardBody>
          <CRow>
            {isAdmin ? (
              <CCol>
                <ReactSelect
                  options={vendors.map((item) => {
                    return {
                      value: item?.account_id,
                      label: `${item.first_name} ${item.last_name} (${item.email})`,
                    };
                  })}
                  handleChange={(e) => setSelectedVendor(e.target.value)}
                  name="selectedVendor"
                  label="Select Vendor"
                  value={selectedVendor}
                  placeholder="Select Vendor"
                  id="selectedProduct"
                />
              </CCol>
            ) : (
              ""
            )}
            {selectedVendor || !isAdmin ? (
              isLoadingproducts ? <CSpinner /> :
              <>
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
                    color="danger"
                    className="mt-2 text-white"
                    onClick={addProduct}
                    disabled={!selectedProduct || isLoading}
                  >
                    <CIcon icon={cilPlus} /> Add Product
                  </CButton>
                </CCol>
              </>

            ) : (
              ""
            )}
          </CRow>
          {(selectedVendor || !isAdmin) && selectedProducts.length > 0 ? (
            <>
              <CRow>
                <CCol>
                  <CTable>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Item</CTableHeaderCell>
                        <CTableHeaderCell scope="col">
                          Description
                        </CTableHeaderCell>
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
                            {productImages?.filter(
                              (ite) => ite?._id === item?.product_id
                            )?.[0]?.product_images?.length > 0 ? (
                              <CImage
                                src={`${
                                  process.env.REACT_APP_API_ENDPOINT
                                }/media/productImage/${
                                  item?.product_id
                                }/${getFirstImage(
                                  item?.product_id,
                                  productImages
                                )}`}
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
                          </CTableDataCell>
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
                              disabled
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
                              disabled
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
                              disabled={[
                                "Pending For Payment",
                                "Approved",
                              ]?.includes(vendorEventStatus)}
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

              <CRow className="mt-3">
                <CCol md={4}></CCol>
                <CCol md={8}>
                  <CRow>
                    <CCol md={8}></CCol>
                    <CCol md={4}>
                      <div style={{ whiteSpace: "nowrap"}}>
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
              {isAdmin ? 
              <CCol className="mt-4">
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <CButton
                      color="danger"
                      disabled={selectedProducts.length <= 0}
                      className="mt-2 text-white"
                      onClick={toggleModel}
                      style={{ float: "right" }}
                    >
                      {isLoading ? (
                        <CSpinner />
                      ) :"Join Event"}
                    </CButton>
                  </div>
                  </CCol>
                  : 
              <CCol className="mt-4">
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  {!["Pending For Payment", "Approved"]?.includes(
                    vendorEventStatus
                  ) && (
                    <CButton
                      color="success"
                      
                      className="mt-2 text-white"
                      onClick={saveProduct}
                      disabled={
                        selectedProducts?.length === 0 ||
                        isLoading ||
                        ["Pending For Payment", "Approved"]?.includes(
                          vendorEventStatus
                        )
                      }
                      style={{ float: "right" }}
                    >
                      <CIcon icon={cilCheckCircle} />
                      {isLoading ? (
                        <CSpinner />
                      ) : account_id ? (
                        " Update & Event Join"
                      ) : (
                        " Save & Event Join"
                      )}
                    </CButton>
                  )}

                  {!["Request To Join", ""]?.includes(vendorEventStatus) && (
                    <CButton
                      color="success"
                      
                      className="mt-2 text-white"
                      onClick={refTranIDFuction}
                      // onClick={updateEvent}
                      disabled={
                        selectedProducts?.length === 0 ||
                        isLoading ||
                        ["Approved"]?.includes(vendorEventStatus)
                      }
                      style={{ float: "right" }}
                    >
                      <CIcon icon={cilCheckCircle} />
                      {isLoading ? (
                        <CSpinner />
                      ) : (
                        " " + EventStatuses(vendorEventStatus)
                      )}
                    </CButton>
                  )}
                </div>
              </CCol>
                }
            </>
          ) : (
            ""
          )}
        </CCardBody>
      </CCard>
      <ProductModal
        setVisible={() => setVisible(false)}
        visible={visible}
        addNewProduct={addNewProduct}
      />
      <PaymentModel
        isAdmin={isAdmin}
        vendor={vendor}
        selectedProducts={selectedProducts}
        setVisiblePaymentModel={() => setVisiblePaymentModel(false)}
        visiblePaymentModel={visiblePaymentModel}
        eventDetail={eventDetail}
        approvedEventStatus={approvedEventStatus}
        eventStatus={vendorEventStatus}
        // addNewProduct={addNewProduct}
      />
    </>
  );
};

export default ProductDetail;
