import React from "react";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { LuUserRoundCog } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import { IoIosSettings } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { LuNotebookText } from "react-icons/lu";

const DashboardSidebar = () => {

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logout Successfully");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <div className=" bg-white h-full border border-black/10 shadow py-2 w-full">
        {/* Admin Header */}
        <div
          className="  h-[12vh]
         flex  flex-col
         justify-center
          items-center sticky top-0"
        >
          <img
            className=" w-16"
            src="https://www.newrise.in/assets/img/nrt.png"
          />
          <span
            className="font-Poppins text-lg
           font-medium
            tracking-widest  uppercase"
          >
            Admin Pannel
          </span>
        </div>

        <div className="px-7 py-6">
          <ul
            className=" space-y-4  font-medium
          "
          >
            <Link to="/dashboard" className=" flex items-center gap-6 ">
              <MdOutlineDashboardCustomize />
              <li className=" font-Poppins text-sm">Dashboard</li>
            </Link>
            <div className=" bg-black/5 w-full h-[1px]"></div>
            <Link to="post" className=" flex items-center gap-5 ">
              <FaFileAlt />
              <li className=" font-Poppins text-sm">Blog Posts</li>
            </Link>
            <div className=" bg-black/5 w-full h-[1px]"></div>

            <Link to="user" className=" flex items-center gap-5 ">
              <FiUser />
              <li className=" font-Poppins text-sm">User</li>
            </Link>
            <div
              className=" bg-black/5
             w-full h-[1px]"
            ></div>

            <Link to="category" className=" flex items-center gap-5 ">
              <LuNotebookText className="text-sm" />
              <li className=" font-Poppins text-sm">Category</li>
            </Link>
            <div
              className=" bg-black/5
             w-full h-[1px]"
            ></div>

            <Link to="profileDetails" className=" flex items-center gap-5 ">
              <LuUserRoundCog />
              <li className=" font-Poppins text-sm"> Profile</li>
            </Link>
            <div className=" bg-black/5 w-full h-[1px]"></div>

            <div className=" flex items-center gap-5 ">
              <IoIosSettings />
              <li className=" font-Poppins text-sm">Setting</li>
            </div>
            <div
              className=" bg-black/5
             w-full h-[1px]"
            ></div>

            <div onClick={handleLogout} className=" flex items-center gap-5 ">
              <LuLogOut />
              <li className=" font-Poppins text-sm">Logout</li>
            </div>
            <div className=" bg-black/5 w-full h-[1px]"></div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
