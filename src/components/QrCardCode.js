import QrCode from "qrcode.react";
import { useEffect, useState } from "react";
import "./style.scss";
import { CButton } from "@coreui/react";
function QrCardCode({
  getCurDate,
  qrRef,
  url,
  bgColor,
  qrColor,
  customImg,
  noImg,
  handleQrReset,
}) {
  let imgCustom = undefined;
  const [downloaded, setDownloaded] = useState(false);
  useEffect(() => {
    if (downloaded) {
      const msg = setTimeout(() => setDownloaded(false), 3500);
      return () => clearTimeout(msg);
    }
  }, [downloaded]);

  const downloadQrCode = (e) => {
  e.preventDefault();
alert("Download Pending...")
  // const qrCanvas = qrRef.current.querySelector("canvas"),
  //   qrImage = qrCanvas.toDataURL("image/png"),
  //   qrAnchor = document.createElement("a"),
  //   fileName = url.replace(httpRgx, "").trim();
  // qrAnchor.href = qrImage;
  // qrAnchor.download = fileName + "_QrCode.png";
  // document.body.appendChild(qrAnchor);
  // qrAnchor.click();
  // document.body.removeChild(qrAnchor);

  // handleQrReset();
  // setDownloaded(true);
};
console.log(getCurDate?._id);
  noImg
    ? (imgCustom = null)
    : customImg
    ? (imgCustom = customImg)
    : (imgCustom = "./logo-apple-icon192.png");

  return (
    <article className="card">
      <div className="qr-box" ref={qrRef} style={{ backgroundColor: bgColor }}>
        <QrCode
          size={250}
          value={getCurDate ? getCurDate?._id : "No Data Found"}
          bgColor={bgColor}
          fgColor={qrColor}
          level="H"
          includeMargin
          imageSettings={{
            src: imgCustom,
            height: 45,
            width: 45,
            excavate: true,
          }}
        />
      </div>
      
      {/*   <CButton onClick={downloadQrCode}>
          <span>Download now</span>
         <img src="./logo-apple-icon192.png" alt="Travolgi" /> 
        </CButton>
  
        {downloaded && <p className="success-msg">Qr Code downloaded.</p>} */}
      
      </article>
      );
    }
    
    export default QrCardCode;