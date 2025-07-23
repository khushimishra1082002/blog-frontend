import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Searchbar from "./Searchbar";
import axios from "axios";
import SocialIcon from "./SocialIcon";

interface Post {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  image: string;
  author: {
    _id: string;
    name: string;
    image?: string;
  };
  published: boolean;
  createdAt: string;
  likes?: string[];
  views?: number;
  comments: string;
}

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userImage, setUserImage] = useState("default-avatar.png");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // const storedUser = localStorage.getItem("user");
    // const user = storedUser ? JSON.parse(storedUser) : null;
    const storedUser = localStorage.getItem("user");
    let user = null;
    try {
      if (storedUser) {
        user = JSON.parse(storedUser);
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
    }

    if (token && user) {
      setIsLoggedIn(true);
      setUserImage(user.image || "default-avatar.png");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logout Successfully");
    navigate("/");
    setIsLoggedIn(false);
  };

  return (
    <>
      <div className="flex  justify-between gap-1 px-5 py-3">
        <div className="flex items-center gap-2 ">
          <div className=" bg-green-500 w-2 h-2 rounded-full"></div>
          <div className=" bg-yellow-500 w-2 h-2 rounded-full"></div>
          <div className=" bg-red-500 w-2 h-2 rounded-full"></div>
          <span className="text-sm italic text-gray-500">
            Ideas worth sharing...
          </span>
        </div>

        <SocialIcon />
      </div>
      <div className=" bg-black/10 w-full h-[1px]"></div>
      <div className="w-full h-16 bg-white flex items-center sticky top-0 z-50 shadow-sm ">
        <div className=" flex justify-between items-center w-full px-4 gap-6">
          {/* Logo */}
          <Link to="/">
            <img
              className="w-20"
              src="https://logodix.com/logo/34884.jpg"
              alt="logo"
            />
          </Link>

          {/* Hamburger Menu  */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navbar  */}
          <div className="hidden md:flex items-center gap-8 ">
            {isLoggedIn ? (
              <ul className="flex gap-10 font-medium text-sm font-poppins font-Inter">
                <li>
                  <Link to="/" className="hover:text-orange-500 cursor-pointer">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profilePage"
                    className="hover:text-orange-500 cursor-pointer"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-orange-500 cursor-pointer"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/addPost"
                    className="hover:text-orange-500 cursor-pointer"
                  >
                    Add Post
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profilePage"
                    className="hover:text-orange-500 cursor-pointer"
                  >
                    My Profile
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="flex gap-10 font-medium text-sm font-poppins font-Inter">
                <li>
                  <Link to="/" className="hover:text-orange-500 cursor-pointer">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-orange-500 cursor-pointer"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-orange-500 cursor-pointer"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/allPosts"
                    className="hover:text-orange-500 cursor-pointer"
                  >
                    New Posts
                  </Link>
                </li>
              </ul>
            )}

            <div className="flex items-center gap-3">
              {/* Searchbar */}
              <div className="hidden lg:block w-full max-w-md ">
                <Searchbar />
              </div>

              {!isLoggedIn ? (
                <div className="flex gap-3">
                  <Link
                    to="/LoggedInPage?type=register"
                    className="px-4 py-2 bg-skin-accent_one
                 hover:bg-orange-600 text-white font-semibold rounded-md font-Inter"
                  >
                    Register
                  </Link>
                  <Link
                    to="/LoggedInPage?type=login"
                    className="px-4 py-2 border border-orange-600/80 rounded-md
                font-Inter"
                  >
                    Login
                  </Link>
                </div>
              ) : (
                <div className="relative group cursor-pointer">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={
                      userImage
                        ? `http://localhost:5000/uploads/${userImage}`
                        : ""
                    }
                    alt="User"
                  />
                  <div
                    className="absolute right-0 border w-32 bg-white
               rounded-md shadow-lg opacity-0 group-hover:opacity-100
                group-hover:visible invisible transition duration-200 z-50"
                  >
                    <Link
                      to="/profilePage"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100
                  "
                    >
                      View Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 text-left"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden py-6">
            <ul className="flex flex-col px-4 py-3 gap-3 font-medium text-sm">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-orange-500 cursor-pointer"
              >
                Home
              </Link>
              <Link
                to=""
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-orange-500 cursor-pointer"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-orange-500 cursor-pointer"
              >
                Contact
              </Link>
              <Link
                to=""
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-orange-500 cursor-pointer"
              >
                New Blog
              </Link>
            </ul>
            <div className="flex flex-col px-4 gap-3">
              {!isLoggedIn ? (
                <>
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    to="/LoggedInPage?type=register"
                    className="w-full text-center px-4 py-2 bg-orange-500 text-white rounded-md"
                  >
                    Register
                  </Link>
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    to="/LoggedInPage?type=login"
                    className="w-full text-center px-4 py-2 border border-orange-500 rounded-md"
                  >
                    Login
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    to="/profilePage"
                    className=" py-2  hover:text-orange-500"
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white py-2 rounded-md"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
