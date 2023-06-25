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
) => {
  const [files, setFiles] = useState([]);
  const app_dispatch = useAppDispatch();
  const onDrop = useCallback((acceptedFiles) => {
    const maxNumber =
      maxFiles - (files?.length || 0) - (acceptedFiles?.length || 0);
    if (acceptedFiles?.length > maxNumber) {
      console.log(acceptedFiles?.length, maxNumber);
      app_dispatch({
        type: "SHOW_RESPONSE",
        toast: AppToast({
          message: `Can Not Upload More Than ${maxFiles} Files`,
          color: "danger-alert",
        }),
      });
    } else {
      console.log("ELSE");
      setFiles(
        acceptedFiles.map((file) => {
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        })
      );
    }
  }, []);

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "image/*": [],
      },
      // maxFiles: maxFiles,
      multiple: multiple,
      maxSize: maxSize,
      // validator: nameLengthValidator,
      onDrop: onDrop,
    });

  const acceptedFileItems = files.map((file) => (
    <li key={file.path}>
      {console.log(file)}
      <CImage src={file.preview} alt={file.path} />
    </li>
  ));

  console.log(files);
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
