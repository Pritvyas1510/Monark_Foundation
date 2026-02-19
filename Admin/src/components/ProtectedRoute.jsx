import { Navigate } from "react-router-dom";   // ✅ ADD THIS
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, role } = useSelector((state) => state.auth);

  // Not logged in → go to login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Role not allowed → go to home
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="*" replace />;
  }

  return children;
};

export default ProtectedRoute;
