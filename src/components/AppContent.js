import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react";
// routes config
import routes from "../routes";
import LoginCheck from "src/utils/checkAuth";
import ProtectedRoute from "src/utils/ProtectedRoute";
import permissionGuard from "src/utils/permissionGuard";
const Page404 = React.lazy(() => import("../views/pages/page404/Page404"));

const AppContent = () => {
  const authToken = localStorage.getItem("eventi");
  return !LoginCheck() ? (
    <Navigate exact to="/login" />
  ) : (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  permission={route.permission}
                  element={
                    authToken ? (
                      permissionGuard(route?.permission) ? (
                        <route.element />
                      ) : (
                        <Navigate exact to="/" />
                      )
                    ) : (
                      <Navigate exact to="/login" />
                    )
                  }
                />
              )
            );
          })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
          <Route path="*" name="Page 404" element={<Page404 />} />
        </Routes>
      </Suspense>
    </CContainer>
  );
};

export default React.memo(AppContent);
