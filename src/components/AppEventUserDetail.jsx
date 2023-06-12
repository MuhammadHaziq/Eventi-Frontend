import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import React from "react";
const AppEventUserDetail = ({ user }) => {
  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between">
        <strong>
          {user?.user_type === "vendor" ? "Vendor" : "Customer"} Information
        </strong>
      </CCardHeader>
      <CCardBody>
        <div>
          <h6 className="vendarH6Info">Name:</h6>
          <span className="vendarSpanInfo">
            {user?.first_name} {user?.last_name}
          </span>
        </div>
        <div>
          <h6 className="vendarH6Info">Business Name:</h6>
          <span className="vendarSpanInfo">{user?.business_name}</span>
        </div>
        <div>
          <h6 className="vendarH6Info">Email:</h6>
          <span className="vendarSpanInfo">{user?.email}</span>
        </div>
        <div>
          <h6 className="vendarH6Info">Phone:</h6>
          <span className="vendarSpanInfo">{user?.phone_number}</span>
        </div>
        <div>
          <h6 className="vendarH6Info">Status:</h6>
          <span className="vendarSpanInfo">
            {user?.user_type === "vendor" ? "Vendor" : "-"}
          </span>
        </div>
      </CCardBody>
    </CCard>
  );
};
export default AppEventUserDetail;
