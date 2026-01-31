import React, { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import { Outlet } from "react-router-dom";

const Dashboard = () => {

  const [open, setOpen] = useState(false);
  
  return (
    <div className=" flex w-full h-screen overflow-hidden">
      <div
        className={` fixed top-[10vh] left-0 h-[90vh] w-[70%] bg-white z-50 overflow-y-auto
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"} 
        md:w-[30%] lg:w-[20%] 
        md:translate-x-0 md:relative md:top-0 md:h-full md:block
  `}
      >
        <DashboardSidebar setOpen={setOpen} />
      </div>

      <div className="md:w-[70%] w-[100%] lg:w-[80%] h-full flex flex-col bg-gray-100">
        <div className="h-[10vh] sticky top-0 z-50 bg-white shadow">
          <DashboardHeader open={open} setOpen={setOpen} />
        </div>

        <div className="h-[90vh] overflow-y-auto p-4 m-2 bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
