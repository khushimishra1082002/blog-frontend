// import axios from "axios";
// import conf from "../config/Conf";

// const api = axios.create({
//   baseURL: conf.BaseURL, 
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Token injection
// api.interceptors.request.use(
//   (config) => {
//     if (config.headers?.requiresAuth) {
//       const token = localStorage.getItem("token");
//       if (token) {
//         config.headers.Authorization = `Bearer ${token.trim()}`;
//       } else {
//         window.location.href = "/LoggedInPage";
//         return Promise.reject("No token found");
//       }
//     }
//     delete config.headers.requiresAuth;
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response handling
// // api.interceptors.response.use(
// //   (response) => response,
// //   (error) => {
// //     if (error.response?.status === 401) {
// //       sessionStorage.removeItem("token");
// //       window.location.href = "/LoggedInPage";
// //     }
// //     return Promise.reject(error);
// //   }
// // );
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const status = error.response?.status;
//     const url = error.config?.url || "";

//     // 🔥 Login APIs ko kabhi redirect mat karo
//     const isLoginApi =
//       url.includes("/api/admin/login") ||
//       url.includes("/api/auth/login");

//     if (isLoginApi) {
//       return Promise.reject(error);
//     }

//     // ✅ Sirf protected API ke liye
//     if (status === 401) {
//       localStorage.removeItem("token");

//       const isAdminRoute =
//         window.location.pathname.startsWith("/dashboard") ||
//         window.location.pathname.startsWith("/admin");

//       window.location.replace(
//         isAdminRoute ? "/admin/login" : "/LoggedInPage"
//       );
//     }

//     return Promise.reject(error);
//   }
// );


// export default api;


import axios from "axios";
import conf from "../config/Conf";

const api = axios.create({
  baseURL: conf.BaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =====================================================
   REQUEST INTERCEPTOR
   - Sirf token inject karega
   - KABHI redirect nahi karega
===================================================== */
api.interceptors.request.use(
  (config) => {
    if (config.headers?.requiresAuth) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token.trim()}`;
      }
    }
    delete config.headers?.requiresAuth;
    return config;
  },
  (error) => Promise.reject(error)
);

/* =====================================================
   RESPONSE INTERCEPTOR
   - Token expire / invalid handle karega
   - Logout flow ko interfere nahi karega
===================================================== */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || "";

    // 🔥 Login APIs ko redirect se bachaao
    const isLoginApi =
      url.includes("/api/admin/login") ||
      url.includes("/api/auth/login");

    // 🔥 Manual logout ke time redirect mat karo
    const isLoggingOut = localStorage.getItem("loggingOut");

    if (isLoginApi || isLoggingOut) {
      return Promise.reject(error);
    }

    if (status === 401) {
      localStorage.removeItem("token");

      const pathname = window.location.pathname;
      const isAdminRoute =
        pathname.startsWith("/dashboard") ||
        pathname.startsWith("/admin");

      window.location.replace(
        isAdminRoute ? "/admin/login" : "/LoggedInPage"
      );
    }

    return Promise.reject(error);
  }
);

export default api;
