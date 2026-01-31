import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../Redux Toolkit/Store";
import { getImageUrl } from "../utils/getImageUrls";
import { fetchProfile } from "../Redux Toolkit/slice/ProfileSlice";
import { logout } from "../Redux Toolkit/slice/ProfileSlice";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state: RootState) => state.profile);

  console.log("user in ProfileDetails:", user);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) await dispatch(fetchProfile());
      setLoading(false);
    };
    loadProfile();
  }, [user, dispatch]);

  if (loading) return <div className="text-center py-6">Loading...</div>;
  if (!user)
    return <div className="text-center text-red-500">User not found</div>;

  const handleLogout = () => {
    localStorage.setItem("loggingOut", "true");
    localStorage.removeItem("token");
    dispatch(logout());
    alert("Admin Logout Successful");
    navigate("/admin/login", { replace: true });
  };

  return (
    <>
      <div className="px-4 h-full flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="md:hidden">
            <button className="focus:outline-none">
              {open ? (
                <X onClick={() => setOpen(false)} size={24} />
              ) : (
                <Menu onClick={() => setOpen(!open)} size={24} />
              )}
            </button>
          </div>
          <div className="flex items-center h-full ">
            <span className="text-lg font-Poppins font-medium">Dashboard</span>
          </div>
        </div>
        <div className="relative group flex items-center gap-2 cursor-pointer">
          {/* User Image */}
          <div className="relative">
            <img
              className="w-8 h-8 rounded-full border border-black/5"
              src={
                user?.image
                  ? getImageUrl(user.image)
                  : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDA..."
              }
            />
            <div className="w-2 h-2 bg-green-600 absolute -top-[2px] rounded-full -right-[2px]"></div>
          </div>

          {/* User Name */}
          <span className="font-Poppins text-sm font-medium">{user?.name}</span>

          <div className="absolute top-full right-0 mt-2 w-32 bg-white border border-black/10 rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
