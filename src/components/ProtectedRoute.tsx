import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode  }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
 
    if (location.pathname.startsWith("/dashboard")) {
      return <Navigate to="/admin/login" replace />;
    }
   
    return <Navigate to="/LoggedInPage" replace />;
  }

  return children;
};

export default ProtectedRoute;
