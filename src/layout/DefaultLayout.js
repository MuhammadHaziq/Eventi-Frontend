import React, { useEffect } from "react";
import {
  AppContent,
  AppSidebar,
  AppFooter,
  AppHeader,
} from "../components/index";
import { useAppDispatch } from "src/context/AppContext";
import { getCurrentUserDetail } from "src/context/AppContext/service";
import { AppToast } from "src/components/AppToast";
const DefaultLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    getCurrentUserDetail(
      JSON.parse(localStorage.getItem("eventi-user"))?._id,
      JSON.parse(localStorage.getItem("eventi-user"))?.user_type
    )
      .then((response) => {
        dispatch({ type: "SET_CURRENT_USER", currentUser: response.data.data });
      })
      .catch((err) => {
        dispatch({
          type: "SHOW_RESPONSE",
          toast: AppToast({ message: err.message, color: "danger-alert" }),
        });
      });
  }, []);
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default DefaultLayout;
