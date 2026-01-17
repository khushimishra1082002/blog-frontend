import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Searchbar from "./Searchbar";
import SocialIcon from "./SocialIcon";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../Redux Toolkit/Store";
import { fetchProfile, logout } from "../Redux Toolkit/slice/ProfileSlice";
import { getImageUrl } from "../utils/getImageUrls";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.profile);

  const isLoggedIn = !!user;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchProfile());
    }
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      {/* Top bar */}
      <div className="flex justify-between px-5 py-3">
        <span className="text-sm italic text-gray-500">
          Ideas worth sharing...
        </span>
        <SocialIcon />
      </div>

      <div className="bg-black/10 w-full h-[1px]" />

      {/* Main Header */}
      <div className="h-16 bg-white sticky top-0 z-50 shadow-sm">
        <div className="flex justify-between items-center h-full px-4">
          {/* Logo */}
          <Link to="/">
            <img
              className="w-20"
              src="https://logodix.com/logo/34884.jpg"
              alt="logo"
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex gap-8 font-medium text-sm">
              <Link to="/">Home</Link>
              <Link to="/contact">Contact</Link>
              {isLoggedIn && <Link to="/addPost">Add Post</Link>}
            </ul>

            <Searchbar />

            {!isLoggedIn ? (
              <div className="flex items-center gap-3">
                {/* Register */}
                <Link to="/LoggedInPage?type=register">
                  <button
                    className="font-Roboto text-md px-5 py-2.5 rounded-md bg-orange-500 text-white
                 font-semibold hover:bg-orange-600 duration-200 focus:outline-none focus:ring-2
              focus:ring-orange-400"
                  >
                    Register
                  </button>
                </Link>

                {/* Login */}
                <Link to="/LoggedInPage?type=login">
                  <button
                    className="font-Roboto text-md px-5 py-2.5 rounded-md border border-orange-500 text-orange-500
                      font-semibold hover:bg-orange-50 transition duration-200 focus:outline-none focus:ring-2
                  focus:ring-orange-400"
                  >
                    Login
                  </button>
                </Link>
              </div>
            ) : (
              <div className="relative group cursor-pointer">
                <div className="flex items-center gap-2">
                  <img
                    src={getImageUrl(user.image)}
                    className="w-9 h-9 rounded-full"
                  />
                  <span className="text-sm">{user.name}</span>
                </div>

                <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition">
                  <Link
                    to="/profilePage"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-md p-4">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>

            {!isLoggedIn ? (
              <>
                <Link to="/LoggedInPage?type=register">Register</Link>
                <Link to="/LoggedInPage?type=login">Login</Link>
              </>
            ) : (
              <>
                <Link to="/profilePage">Profile</Link>
                <button onClick={handleLogout}>Logout</button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
