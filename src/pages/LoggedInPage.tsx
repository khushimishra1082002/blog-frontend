import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const LoggedInPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // Read type from URL query
  const queryParams = new URLSearchParams(location.search);
  const formType = queryParams.get("type");

  return (
    <div className="grid grid-cols-1  md:grid-cols-2 h-screen">
      <div className="w-full h-full">
        <img
          className="w-full h-full object-cover"
          src="https://cusmin.com/images/blog/how-to-add-wordpress-login-background-image/wordpress-login-bg-image-1280.webp"
          alt="login background"
        />
      </div>
      <div className="lg:h-screen flex items-center justify-center px-4 w-11/12 lg:w-8/12 m-auto
       py-6">
        <div className="w-full max-w-xl">
          <div className="h-full">
            {formType === "register" ? (
              <Register setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoggedInPage;
