// // import { ReactNode } from "react";
// // import { Navigate, useLocation } from "react-router-dom";

// // interface ProtectedRouteProps {
// //   children: ReactNode;
// // }

// // const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
// //   const location = useLocation();

// //   const token = localStorage.getItem("token");
// //   const role = localStorage.getItem("role");

// //   const isAdminRoute =
// //     location.pathname.startsWith("/dashboard") ||
// //     location.pathname.startsWith("/admin");

// //   const isAllowed = !!token && role === "admin";

// //   console.log("isAllowed:", isAllowed);

// //   if (!isAllowed) {
// //     return (
// //       <Navigate
// //         to={isAdminRoute ? "/admin/login" : "/LoggedInPage"}
// //         replace
// //       />
// //     );
// //   }

// //   return <>{children}</>;
// // };

// // export default ProtectedRoute;

// import { ReactNode } from "react";
// import { Navigate, useLocation } from "react-router-dom";

// interface ProtectedRouteProps {
//   children: ReactNode;
// }

// const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
//   const location = useLocation();

//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   const isAdminRoute = location.pathname.startsWith("/dashboard");

//   // 🔒 ONLY ADMIN ALLOWED
//   if (!token || role !== "admin") {
//     return <Navigate to="/admin/login" replace />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;

import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    // admin route ke liye admin login
    if (location.pathname.startsWith("/dashboard")) {
      return <Navigate to="/admin/login" replace />;
    }
    // normal UI ke liye LoggedInPage
    return <Navigate to="/LoggedInPage" replace />;
  }

  return children;
};

export default ProtectedRoute;
