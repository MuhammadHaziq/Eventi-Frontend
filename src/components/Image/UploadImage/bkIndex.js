import React, { useCallback, useState } from "react";
import { CContainer, CImage } from "@coreui/react";
import { useDropzone } from "react-dropzone";
import "./uploadImage.scss";
import { AppToast } from "src/components/AppToast";
import { useAppDispatch } from "src/context/AppContext";
const UploadImage = (
  onFileUpload = () => {},
  uploadedFiles = [],
  maxFiles = 2,
  multiple = true,
  maxSize = 5000000
  //
) => {
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const app_dispatch = useAppDispatch();
  const onDrop = useCallback((acceptedFiles) => {
    const maxNumber =
      maxFiles - ((files?.length || 0) - (acceptedFiles?.length || 0));
    if ((images?.length || 0) + (acceptedFiles?.length || 0) > maxFiles) {
      app_dispatch({
        type: "SHOW_RESPONSE",
        toast: AppToast({
          message: `Can Not Upload More Than ${maxFiles} Files`,
          color: "danger-alert",
        }),
      });
    } else {
      const acceptFiles = acceptedFiles?.filter(
        (item) => item?.size <= maxSize
      );
      if (acceptFiles && acceptFiles?.length > 0) {
        setImages(acceptFiles);
        setFiles(
          acceptFiles?.map((file) => {
            return Object.assign(file, {
              preview: URL.createObjectURL(file),
            });
          })
        );
      }
      const notAcceptFiles = acceptedFiles?.filter(
        (item) => item?.size > maxSize
      );
      if (notAcceptFiles && notAcceptFiles?.length > 0) {
        for (const item of notAcceptFiles) {
          app_dispatch({
            type: "SHOW_RESPONSE",
            toast: AppToast({
              message: `${item?.name} Can Not Upload More Than ${maxSize} Files Size`,
              color: "danger-alert",
            }),
          });
        }
      }
    }
  }, []);

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "image/*": [],
      },
      // maxFiles: maxFiles,
      multiple: multiple,
      // maxSize: maxSize,
      // validator: nameLengthValidator,
      onDrop: onDrop,
    });

  const acceptedFileItems = files.map((file) => (
    <li key={file.path}>
      <CImage src={file.preview} alt={file.path} />
    </li>
  ));

  return (
    <CContainer className="upload-image">
      <div {...getRootProps({ className: "dropzone upload-image-container" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <em>(Only *.jpeg, *.jpg and *.png images will be accepted)</em>
      </div>
      <aside>
        <h4>Accepted files</h4>
        <div className="d-flex flex-row gap-2 mt-2 mb-2 accepted-files-list">
          {acceptedFileItems}
        </div>
      </aside>
    </CContainer>
  );
};
export default UploadImage;
