import React from "react";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { LuUserRoundCog } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { LuNotebookText } from "react-icons/lu";
import { TbLockPassword } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../Redux Toolkit/Store";
import { logout } from "../Redux Toolkit/slice/ProfileSlice";

interface DashboardSidebarProps {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ setOpen }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    localStorage.setItem("loggingOut", "true");
    localStorage.removeItem("token");
    dispatch(logout());
    alert("Admin Logout Successful");
    navigate("/admin/login", { replace: true });
  };

  const closeSidebar = () => {
    setOpen?.(false);
  };

  return (
    <>
      <div className=" bg-white h-full border border-black/10 shadow py-2 w-full">
        {/* Admin Header */}
        <div>
          <Link to="/dashboard">
            <div
              className="h-[12vh] flex flex-col justify-center
              items-center sticky top-0"
            >
              <img
                className=" w-16"
                src="https://www.newrise.in/assets/img/nrt.png"
              />
              <span
                className="font-Poppins text-lgfont-medium
                tracking-widest uppercase"
              >
                Admin Pannel
              </span>
            </div>
          </Link>
        </div>

        <div className="px-7 py-6">
          <ul
            className=" space-y-4  font-medium
          "
          >
            <Link
              onClick={closeSidebar}
              to="/dashboard"
              className=" flex items-center gap-6 cursor-pointer"
            >
              <MdOutlineDashboardCustomize />
              <li className=" font-Poppins text-sm">Dashboard</li>
            </Link>
            <div className=" bg-black/5 w-full h-[1px]"></div>
            <Link
              onClick={closeSidebar}
              to="post"
              className=" flex items-center gap-5 cursor-pointer"
            >
              <FaFileAlt />
              <li className=" font-Poppins text-sm">Blog Posts</li>
            </Link>
            <div className=" bg-black/5 w-full h-[1px]"></div>

            <Link
              onClick={closeSidebar}
              to="user"
              className=" flex items-center gap-5 cursor-pointer"
            >
              <FiUser />
              <li className=" font-Poppins text-sm">Users</li>
            </Link>
            <div
              className=" bg-black/5
             w-full h-[1px]"
            ></div>

            <Link
              onClick={closeSidebar}
              to="category"
              className=" flex items-center gap-5 cursor-pointer "
            >
              <LuNotebookText className="text-sm" />
              <li className=" font-Poppins text-sm">Category</li>
            </Link>
            <div
              className=" bg-black/5
             w-full h-[1px]"
            ></div>

            <Link
              onClick={closeSidebar}
              to="profileDetails"
              className=" flex items-center gap-5 cursor-pointer"
            >
              <LuUserRoundCog />
              <li className=" font-Poppins text-sm"> Profile</li>
            </Link>
            <div className=" bg-black/5 w-full h-[1px]"></div>

            <Link
              onClick={closeSidebar}
              to="changePassword"
              className="flex items-center gap-5 cursor-pointer"
            >
              <TbLockPassword className="text-sm" />
              <li className="font-Poppins text-sm">Change Password</li>
            </Link>
            <div className="bg-black/5 w-full h-[1px]"></div>

            <div
              onClick={handleLogout}
              className=" flex items-center gap-5 cursor-pointer"
            >
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
