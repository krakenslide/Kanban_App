import useStore from "../../store.js";
import { Navigate } from "react-router-dom";

function PrivateOnlyRoutes({ Component }) {
  const { isLoggedIn } = useStore();
  return !isLoggedIn ? <Navigate to="/" replace /> : <Component />;
}

export default PrivateOnlyRoutes;
