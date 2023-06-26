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
import ReactSelect from "src/components/Inputs/ReactSelect";
import { useAppState } from "src/context/AppContext";
import { vendorDropDown } from "src/context/AppContext/service";
import UploadImage from "src/components/Image/UploadImage";

const ProductModal = ({
  product_id,
  visible,
  setVisible,
  addNewProduct = () => {},
}) => {
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAppState();
  const [vendors, setVendors] = useState([]);
  const [dropDownVendors, setDropDownVendors] = useState([]);
  const [selectedVendors, setSelectedVendors] = useState(null);
  const [, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const app_dispatch = useAppDispatch();
  const [state, setState] = useState({
    product_name: "",
    product_quantity: null,
    product_price: null,
  });

  const getVendorProducts = React.useCallback(() => {
    vendorDropDown()
      .then((response) => {
        if (response.data.data) {
          setVendors(response?.data.data);
          setDropDownVendors(
            response?.data?.data?.map((item) => {
              return {
                value: item?.account_id,
                label: (item?.first_name || "") + " " + (item?.last_name || ""),
              };
            }) || []
          );
        } else {
          setVendors([]);
          setDropDownVendors([]);
        }
      })
      .catch((err) => {
        setDropDownVendors([]);
        setVendors([]);
        console.log(err);
      });
  }, []);

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
            setSelectedVendors(response.data.data.vendor_account_id || "");
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
    if (!product_id) {
      if (files && files?.length === 0) {
        app_dispatch({
          type: "SHOW_RESPONSE",
          toast: AppToast({
            message: "File Input Is Required",
            color: "danger-alert",
          }),
        });
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    }
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      event.stopPropagation();
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("product_name", state.product_name);
        formData.append("product_price", state.product_price);
        formData.append("product_quantity", state.product_quantity);
        formData.append(
          "vendor_account_id",
          !["admin"].includes(currentUser?.data?.user_type)
            ? currentUser?.data?._id
            : selectedVendors
        );
        if (product_id) {
          formData.append("product_id", state.product_id);
        }
        if (!product_id) {
          if (files && files?.length > 0) {
            for (let x in files) {
              if (typeof files[x] === "object") {
                formData.append(`product_images`, files[x]);
              }
            }
          }
        }

        (product_id ? updateProduct(formData) : addProduct(formData))

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
    if (currentUser?.data?.user_type === "admin") {
      getVendorProducts();
    }
  }, [product_id]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      // if(acceptedFiles?.length >= 5 || files?.length >= 5){
      if (
        (acceptedFiles || [])?.length + (state.banner_images || [])?.length >
        5
      ) {
        app_dispatch({
          type: "SHOW_RESPONSE",
          toast: AppToast({
            message: "More Than 5 Files Are Not Allowed",
            color: "danger-alert",
          }),
        });

        return;
      }
      setFiles([
        ...files,
        ...acceptedFiles?.map((file) => {
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        }),
      ]);

      acceptedFiles.map((file, index) => {
        const reader = new FileReader();
        reader.onload = function (e) {
          setImages((prevState) => [
            ...prevState,
            { id: index, src: e.target.result },
          ]);
        };
        reader.readAsDataURL(file);

        return file;
      });
    },
    [files]
  );

  const handleOnRemove = (fileName) => {
    setFiles(files?.filter((item) => item.name !== fileName));
  };

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
            <CCol md={12}>
              <CFormInput
                type="text"
                id="floatingInputValid"
                floatingclassname="mb-3"
                floatinglabel="Product Name"
                placeholder="Product Name"
                label="Product Name"
                name="product_name"
                value={state.product_name}
                onChange={handleOnChange}
                required
              />
              <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>
            <CCol md={12}>
              <CFormInput
                type="number"
                id="floatingInputValid2"
                floatingclassname="mb-3"
                floatinglabel="Price"
                placeholder="Price"
                label="Product Price"
                name="product_price"
                value={state.product_price}
                onChange={handleOnChange}
                required
              />
              <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>
            <CCol md={12}>
              <CFormInput
                type="number"
                id="floatingInputValid2"
                floatingclassname="mb-3"
                floatinglabel="Quantity"
                label="Product Quantity"
                placeholder="Quantity"
                name="product_quantity"
                value={state.product_quantity}
                onChange={handleOnChange}
                required
              />
              <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>
            {currentUser?.data?.user_type === "admin" ? (
              <CCol md={12}>
                <ReactSelect
                  isSearchable={true}
                  options={dropDownVendors}
                  handleChange={(e) => setSelectedVendors(e.target.value)}
                  name="selectedVendors"
                  label="Select Product"
                  value={selectedVendors}
                  placeholder="Select Product"
                  id="selectedVendors"
                />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>
            ) : (
              ""
            )}
            <CCol md={12}>
              <UploadImage
                onDrop={onDrop}
                maxFiles={5}
                images={files}
                removeSelectedFiles={handleOnRemove}
                maxSize={25000000}
              />
            </CCol>
            <CCol className="text-end">
              <CButton
                size="md"
                color="success"
                variant="outline"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <CSpinner /> : "Save"}
              </CButton>

              <CButton
                style={{ marginLeft: "10px" }}
                color="dark"
                size="md"
                variant="outline"
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
