import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCurrentUserDetail } from "src/context/AppContext/service";
const AppEventUserDetail = () => {
  const { account_id } = useParams();
  const [currentUser, setCurrentUser] = useState(null);

  const getUserDetail = useCallback(() => {
    if (account_id) {
      getCurrentUserDetail(account_id)
        .then((response) => {
          setCurrentUser(response.data.data.data);
        })
        .catch((error) => {});
    }
  }, [account_id]);
  useEffect(() => {
    if (account_id) {
      getUserDetail();
    }
  }, [account_id]);
  return (
    <CCard className="mb-4 p-2">
      <CCardHeader className="d-flex justify-content-between">
        <strong>
          {currentUser?.user_type === "vendor" ? "Vendor" : "Customer"}{" "}
          Information
        </strong>
      </CCardHeader>
      <CCardBody>
        <div>
          <h6 className="vendarH6Info">Name:</h6>
          <span className="vendarSpanInfo">
            {currentUser?.first_name} {currentUser?.last_name}
          </span>
        </div>
        <div>
          <h6 className="vendarH6Info">Business Name:</h6>
          <span className="vendarSpanInfo">
            {currentUser?.user_detail?.business_name}
          </span>
        </div>
        <div>
          <h6 className="vendarH6Info">Email:</h6>
          <span className="vendarSpanInfo">{currentUser?.email}</span>
        </div>
        <div>
          <h6 className="vendarH6Info">Phone:</h6>
          <span className="vendarSpanInfo">{currentUser?.phone_number}</span>
        </div>
        {/* <div>
          <h6 className="vendarH6Info">Status:</h6>
          <span className="vendarSpanInfo">
            {currentUser?.joined_vendors?.event_status}
          </span>
        </div> */}
      </CCardBody>
    </CCard>
  );
};
export default AppEventUserDetail;
