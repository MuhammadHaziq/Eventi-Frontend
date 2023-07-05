import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import "./uploadImage.scss";
import CIcon from "@coreui/icons-react";
import { cilClosedCaptioning, cilMinus } from "@coreui/icons";
import { CImage } from "@coreui/react";
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function UploadImage({
  accept = {
    "image/*": [".jpeg", ".png", ".jpg"],
  },
  maxFiles = 2,
  onDrop = () => {},
  images = [],
  removeSelectedFiles = () => {},
  maxSize = 5242880,
}) {
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive,
    fileRejections,
  } = useDropzone({
    accept: accept,
    maxFiles: maxFiles,
    onDrop: onDrop,
    minSize: 0,
    maxSize: maxSize,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const fileRejectionItems = (fileRejections || []).map(({ file, errors }) => {
    return (
      <li key={file.path}>
        {file.path} - {file.size} bytes
        <ul>
          {errors.map((e) => (
            <li key={e.code} className="text-danger">
              {e.message}
            </li>
          ))}
        </ul>
      </li>
    );
  });

  return (
    <div className="container file-upload-container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {!isDragActive && (
          <>
            <p>
              Drag &apos;n&apos; drop some files here, or click to select files
              ( png/jpg)
            </p>
            {/*   <em>
              ({maxFiles} files are the maximum number of files you can drop
              here)
            </em> */}
          </>
        )}
        {images.length > 0 && (
          <ul
            className="d-flex flex-row gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            {(images || [])?.map((acceptedFile, index) => (
              <li key={index}>
                <span>
                  <CIcon
                    icon={cilMinus}
                    onClick={() => removeSelectedFiles(acceptedFile.name)}
                  ></CIcon>
                </span>
                <CImage
                  src={acceptedFile.preview}
                  alt={acceptedFile.path}
                  width={"60px"}
                  height={"60px"}
                />
              </li>
            ))}
          </ul>
        )}
        <ul>{fileRejectionItems}</ul>
      </div>
    </div>
  );
}
export default UploadImage;
