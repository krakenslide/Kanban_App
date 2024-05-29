import React from "react";
import { Navigate } from "react-router-dom";
import useStore from "../../store.js";

function PublicOnlyRoutes({ Component }) {
  const { isLoggedIn } = useStore();
  return isLoggedIn ? <Navigate to="/boards" replace /> : <Component />;
}

export default PublicOnlyRoutes;
