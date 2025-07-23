import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { Menu, X } from "lucide-react";

const DashboardHeader = ({ open,setOpen }) => {
  const [query,setQuery] = useState("")

  const storedUser = localStorage.getItem("user");

  console.log("storedUser", storedUser);

  const user = storedUser ? JSON.parse(storedUser) : null;

  console.log("user", user);

  return (
    <>
      <div className="px-4 h-full flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="md:hidden">
            <button className="focus:outline-none">
              {open ? <X onClick={() => setOpen(false)} 
               size={24} /> : <Menu onClick={() => setOpen(!open)} size={24} />}
            </button>
          </div>
          <div className="flex items-center h-full ">
            <span className="text-lg font-Poppins font-medium">Dashboard</span>
          </div>
        </div>
        <div className="flex items-center gap-5 text-gray-700">
          <IoSearchSharp className="text-xl" />
          <div className=" relative">
            <FaRegBell />
            <div className="w-2 h-2 bg-red-500 absolute -top-[3px] rounded-full -right-[2px]"></div>
          </div>
          <div className=" flex items-center gap-2">
            <div className=" relative">
              <img
                className="w-8 h-8 rounded-full border border-black/5"
                src={
                  user?.image
                    ? `http://localhost:5000/uploads/${user.image}`
                    : "data:image/jpeg;base64,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"
                }
              />
              <div className="w-2 h-2 bg-green-600 absolute -top-[2px] rounded-full -right-[2px]"></div>
            </div>

            <span className=" font-Poppins text-sm font-medium ">
              {user?.name}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
