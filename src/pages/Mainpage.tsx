import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SocialIcon from "../components/SocialIcon";
import { useLocation } from "react-router-dom";

const Mainpage = () => {
  const location = useLocation();

  const shouldHideHeader = location.pathname === "/LoggedInPage";

  return (
    <>
      {!shouldHideHeader && <Header />}

      <Outlet />
    </>
  );
};

export default Mainpage;
