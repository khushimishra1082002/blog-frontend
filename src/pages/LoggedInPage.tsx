import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const LoggedInPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const formType = queryParams.get("type");

  return (
    <div className="grid grid-cols-1  md:grid-cols-2 h-screen">
      <div className="w-full h-screen relative">
        <img
          className="w-full h-full object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbm77Xr17tastYtlb47cCgQAocZXSKgZqXOCB_T6nCuMX1-wqN4UE0yYr_&s=10"
          alt="login background"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-10 text-white">
          <h1 className="text-5xl font-bold mb-4 font-Poppins">
            Share Your Stories
          </h1>

          <p className="text-sm max-w-md text-gray-200 font-OpenSans">
            Write, publish and inspire readers around the world.
            Create amazing blogs and connect with your audience.
          </p>

          <div className="mt-6">
            <span className="text-sm bg-white/20 px-4 py-2 rounded-full">
              ✍️ Blogging Platform
            </span>
          </div>
        </div>
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
