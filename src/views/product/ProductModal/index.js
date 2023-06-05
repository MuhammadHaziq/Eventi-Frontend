import React, { useCallback, useEffect, useState } from "react";
import {
  CCol,
  CRow,
  CForm,
  CFormInput,
  CFormFeedback,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSpinner,
} from "@coreui/react";
import {
  addProduct,
  getProduct,
  updateProduct,
} from "src/context/ProductContext/service";
import { useAppDispatch } from "src/context/AppContext";
import { AppToast } from "src/components/AppToast";

const ProductModal = ({
  product_id,
  visible,
  setVisible,
  addNewProduct = () => {},
}) => {
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const app_dispatch = useAppDispatch();
  const [state, setState] = useState({
    product_name: "",
    product_quantity: null,
    product_price: null,
  });

  const getProductById = useCallback(() => {
    try {
      setIsLoading(true);
      getProduct(product_id)
        .then((response) => {
          if (response.data.data) {
            setState({
              product_name: response.data.data.product_name,
              product_quantity: response.data.data.product_quantity,
              product_price: response.data.data.product_price,
            });
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
    } catch (err) {
      setIsLoading(false);
      app_dispatch({
        type: "SHOW_RESPONSE",
        toast: AppToast({ message: err.message, color: "danger-alert" }),
      });
    }
  }, [product_id]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      event.stopPropagation();
      setIsLoading(true);
      try {
        (product_id
          ? updateProduct({
              product_id: product_id,
              product_name: state.product_name,
              product_price: state.product_price,
              product_quantity: state.product_quantity,
            })
          : addProduct({
              product_name: state.product_name,
              product_price: state.product_price,
              product_quantity: state.product_quantity,
            })
        )
          .then((response) => {
            setIsLoading(false);
            if (response?.data?.data) {
              addNewProduct(response?.data?.data);
            }
            app_dispatch({
              type: "SHOW_RESPONSE",
              toast: AppToast({
                message: response.data.message,
                color: "success-alert",
              }),
            });
            setVisible();
          })
          .catch((err) => {
            setIsLoading(false);
            app_dispatch({
              type: "SHOW_RESPONSE",
              toast: AppToast({
                message: err.message,
                color: "danger-alert",
              }),
            });
          });
      } catch (err) {
        setIsLoading(false);
        app_dispatch({
          type: "SHOW_RESPONSE",
          toast: AppToast({
            message: err.response.data.message,
            color: "danger-alert",
          }),
        });
      }
    }
    setValidated(true);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    if (product_id) {
      getProductById();
    }
  }, [product_id]);

  return (
    <>
      <CModal
        backdrop="static"
        visible={visible}
        onClose={setVisible}
        size="md"
      >
        <CModalHeader>
          <CModalTitle>{product_id ? "Edit" : "Add"} Product</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <CCol md={4}>
              <CFormInput
                type="text"
                id="floatingInputValid"
                floatingclassname="mb-3"
                floatinglabel="Product Name"
                placeholder="Product Name"
                name="product_name"
                value={state.product_name}
                onChange={handleOnChange}
                required
              />
              <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>
            <CCol md={4}>
              <CFormInput
                type="number"
                id="floatingInputValid2"
                floatingclassname="mb-3"
                floatinglabel="Price"
                placeholder="Price"
                name="product_price"
                value={state.product_price}
                onChange={handleOnChange}
                required
              />
              <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>
            <CCol md={4}>
              <CFormInput
                type="number"
                id="floatingInputValid2"
                floatingclassname="mb-3"
                floatinglabel="Quantity"
                placeholder="Quantity"
                name="product_quantity"
                value={state.product_quantity}
                onChange={handleOnChange}
                required
              />
              <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>
            <CCol className="text-end">
              <CButton color="primary" type="submit" disabled={isLoading}>
                {isLoading ? <CSpinner /> : "Save"}
              </CButton>

              <CButton
                style={{ marginLeft: "10px" }}
                color="secondary"
                onClick={setVisible}
                disabled={isLoading}
              >
                Close
              </CButton>
            </CCol>
          </CForm>
        </CModalBody>
      </CModal>
    </>
  );
};
export default ProductModal;
