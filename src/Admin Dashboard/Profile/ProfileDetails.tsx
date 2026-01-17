import React from "react";
import { FaCamera } from "react-icons/fa";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import { Link } from "react-router-dom";
import conf from "../../config/Conf";
import { getImageUrl } from "../../utils/getImageUrls";

const ProfileDetails = () => {
  const storedUser = localStorage.getItem("user");
  console.log("storedUser", storedUser);

  const user = storedUser ? JSON.parse(storedUser) : null;

  console.log("user", user);
  return (
    <>
      <div className=" bg-white grid grid-cols-4 gap-4">
        <div className=" space-y-3 p-3">
          <h1 className="text-base font-Inter font-medium tracking-wider">
            Account Management
          </h1>
          <div className="w-48 h-48 m-auto">
            <img
              className="w-full h-full object-cover"
              src={
                 getImageUrl(user?.image)
              }
            />
          </div>
          {/* <div className="w-full py-2 border border-black/10 flex gap-2 justify-center items-center">
            <FaCamera className=" text-cyan-400 " />
            <span className=" text-sm font-medium tracking-wider">
              Upload Photo
            </span>
          </div> */}
          <div>
            <Link to="/dashboard/changePassword">
              <button
                className="bg-red-500 text-white px-4 py-2 w-full
                  hover:bg-sky-600 duration-500 font-Roboto rounded font-semibold
                  shadow-lg hover:scale-105"
              >
                Change Password
              </button>
            </Link>
          </div>
        </div>
        <div className=" col-span-3 border border-black/20 py-3 px-5  rounded-sm">
          <h1 className="text-base font-medium font-Inter tracking-wider">
            Profile Information
          </h1>
          <EditProfile />
        </div>
      </div>
    </>
  );
};

export default ProfileDetails;
