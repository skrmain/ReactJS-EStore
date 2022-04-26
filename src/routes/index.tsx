import React, { useGlobal } from "reactn";

import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";

import LoginPage from "../pages/Login";
import ProductListPage from "../pages/ProductList";
import RegisterPage from "../pages/Register";
import CartPage from "../pages/Cart";
import NotFoundPage from "../pages/NotFound";

import { APP_NAME, FRONTEND_ENDPOINTS } from "../constants";

const updateTitle = (pathname: string) => {
  const endpoint = FRONTEND_ENDPOINTS.filter(
    (value) =>
      value.link === pathname ||
      (pathname.startsWith(value.link) && value.link !== "/")
  );

  let docTitle = "Not Found";
  if (endpoint.length > 0) docTitle = endpoint[0].name;

  document.title = `${docTitle} | ${APP_NAME}`;
};

const PrivateRoute = () => {
  const { isLogin } = useGlobal("userDetail")[0];
  return isLogin ? <Outlet /> : <Navigate to="/login" />;
};

const MyRoutes = () => {
  const { pathname } = useLocation();

  updateTitle(pathname);

  return (
    <Routes>
      <Route path="/" element={<ProductListPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/cart" element={<CartPage />} />
      </Route>

      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default MyRoutes;
