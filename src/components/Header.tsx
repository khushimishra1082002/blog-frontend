// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Menu, X } from "lucide-react";
// import Searchbar from "./Searchbar";
// import SocialIcon from "./SocialIcon";
// import conf from "../config/Conf";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState, AppDispatch } from "../Redux Toolkit/Store";
// import { fetchProfile } from "../Redux Toolkit/slice/ProfileSlice";

// const Header = () => {
//   // const [user, setUser] = useState(
//   //   JSON.parse(localStorage.getItem("user") || "null")
//   // );
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const storedUser = localStorage.getItem("user");

//   console.log("storedUser", storedUser);

//   // console.log("user", user);
//   const dispatch = useDispatch<AppDispatch>();

//   useEffect(() => {
//   dispatch(fetchProfile());
// }, [dispatch]);

//      const { user } = useSelector(
//         (state: RootState) => state.profile
//       );
//       console.log("l",user);

//   useEffect(() => {
//     const handleStorageChange = () => {
//       const storedUser = localStorage.getItem("user");
//       // setUser(storedUser ? JSON.parse(storedUser) : null);
//     };

//     window.addEventListener("storage", handleStorageChange);

//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     console.log(token);

//     // const storedUser = localStorage.getItem("user");
//     // const user = storedUser ? JSON.parse(storedUser) : null;
//     const storedUser = localStorage.getItem("user");
//     console.log("storedUser", storedUser);

//     let user = null;
//     try {
//       if (storedUser) {
//         user = JSON.parse(storedUser);
//       }
//     } catch (error) {
//       console.error("Failed to parse user from localStorage:", error);
//     }

//     if (token && user) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     alert("Logout Successfully");
//     navigate("/");
//     setIsLoggedIn(false);
//   };

//   return (
//     <>
//       <div className="flex  justify-between gap-1 px-5 py-3">
//         <div className="flex items-center gap-2 ">
//           <div className=" bg-green-500 w-2 h-2 rounded-full"></div>
//           <div className=" bg-yellow-500 w-2 h-2 rounded-full"></div>
//           <div className=" bg-red-500 w-2 h-2 rounded-full"></div>
//           <span className="text-sm italic text-gray-500">
//             Ideas worth sharing...
//           </span>
//         </div>

//         <SocialIcon />
//       </div>
//       <div className=" bg-black/10 w-full h-[1px]"></div>
//       <div className="w-full h-16 bg-white flex items-center sticky top-0 z-50 shadow-sm ">
//         <div className=" flex justify-between items-center w-full px-4 gap-6">
//           {/* Logo */}
//           <Link to="/">
//             <img
//               className="w-20"
//               src="https://logodix.com/logo/34884.jpg"
//               alt="logo"
//             />
//           </Link>

//           {/* Hamburger Menu  */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="focus:outline-none"
//             >
//               {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>

//           {/* Desktop Navbar  */}
//           <div className="hidden md:flex items-center gap-8 ">
//             {isLoggedIn ? (
//               <ul className="flex gap-10 font-medium text-sm font-poppins font-Inter">
//                 <li>
//                   <Link to="/" className="hover:text-orange-500 cursor-pointer">
//                     Home
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/profilePage"
//                     className="hover:text-orange-500 cursor-pointer"
//                   >
//                     About
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/contact"
//                     className="hover:text-orange-500 cursor-pointer"
//                   >
//                     Contact
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/addPost"
//                     className="hover:text-orange-500 cursor-pointer"
//                   >
//                     Add Post
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/profilePage"
//                     className="hover:text-orange-500 cursor-pointer"
//                   >
//                     My Profile
//                   </Link>
//                 </li>
//               </ul>
//             ) : (
//               <ul className="flex gap-10 font-medium text-sm font-poppins font-Inter">
//                 <li>
//                   <Link to="/" className="hover:text-orange-500 cursor-pointer">
//                     Home
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/about"
//                     className="hover:text-orange-500 cursor-pointer"
//                   >
//                     About
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/contact"
//                     className="hover:text-orange-500 cursor-pointer"
//                   >
//                     Contact
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/allPosts"
//                     className="hover:text-orange-500 cursor-pointer"
//                   >
//                     New Posts
//                   </Link>
//                 </li>
//               </ul>
//             )}

//             <div className="flex items-center gap-3">
//               {/* Searchbar */}
//               <div className="hidden lg:block w-full max-w-md ">
//                 <Searchbar />
//               </div>

//               {!isLoggedIn ? (
//                 <div className="flex gap-3">
//                   <Link
//                     to="/LoggedInPage?type=register"
//                     className="px-4 py-2 bg-skin-accent_one
//                  hover:bg-orange-600 text-white font-semibold rounded-md font-Inter"
//                   >
//                     Register
//                   </Link>
//                   <Link
//                     to="/LoggedInPage?type=login"
//                     className="px-4 py-2 border border-orange-600/80 rounded-md
//                 font-Inter"
//                   >
//                     Login
//                   </Link>
//                 </div>
//               ) : (
//                 <div className="relative group cursor-pointer">
//                   <div className="flex gap-1 items-center">
//                     <img
//                       className="w-9 h-9 rounded-full border border-black/5"
//                       src={
//                         user?.image
//                           ? user?.image
//                           : "data:image/jpeg;base64,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"
//                       }
//                     />
//                     <span className="font-Poppins text-sm">{user?.name}</span>
//                   </div>
//                   <div
//                     className="absolute right-0 border w-32 bg-white
//                rounded-md shadow-lg opacity-0 group-hover:opacity-100
//                 group-hover:visible invisible transition duration-200 z-50"
//                   >
//                     <Link
//                       to="/profilePage"
//                       className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100
//                   "
//                     >
//                       View Profile
//                     </Link>
//                     <button
//                       onClick={handleLogout}
//                       className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 text-left"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Mobile Nav Menu */}
//         {mobileMenuOpen && (
//           <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden py-6">
//             <ul className="flex flex-col px-4 py-3 gap-3 font-medium text-sm">
//               <Link
//                 to="/"
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="hover:text-orange-500 cursor-pointer"
//               >
//                 Home
//               </Link>
//               <Link
//                 to=""
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="hover:text-orange-500 cursor-pointer"
//               >
//                 About
//               </Link>
//               <Link
//                 to="/contact"
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="hover:text-orange-500 cursor-pointer"
//               >
//                 Contact
//               </Link>
//               <Link
//                 to=""
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="hover:text-orange-500 cursor-pointer"
//               >
//                 New Blog
//               </Link>
//             </ul>
//             <div className="flex flex-col px-4 gap-3">
//               {!isLoggedIn ? (
//                 <>
//                   <Link
//                     onClick={() => setMobileMenuOpen(false)}
//                     to="/LoggedInPage?type=register"
//                     className="w-full text-center px-4 py-2 bg-orange-500 text-white rounded-md"
//                   >
//                     Register
//                   </Link>
//                   <Link
//                     onClick={() => setMobileMenuOpen(false)}
//                     to="/LoggedInPage?type=login"
//                     className="w-full text-center px-4 py-2 border border-orange-500 rounded-md"
//                   >
//                     Login
//                   </Link>
//                 </>
//               ) : (
//                 <>
//                   <Link
//                     onClick={() => setMobileMenuOpen(false)}
//                     to="/profilePage"
//                     className=" py-2  hover:text-orange-500"
//                   >
//                     View Profile
//                   </Link>
//                   <button
//                     onClick={handleLogout}
//                     className="bg-red-600 text-white py-2 rounded-md"
//                   >
//                     Logout
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Header;
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

   const token = localStorage.getItem("token");

   console.log("token",token);
   

  // 🔥 Fetch profile on refresh if token exists
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
                    className="font-Roboto text-md
        px-5 py-2.5
        rounded-md
        bg-orange-500
        text-white

        font-semibold
        hover:bg-orange-600
        transition
        duration-200
        focus:outline-none
        focus:ring-2
        focus:ring-orange-400
      "
                  >
                    Register
                  </button>
                </Link>

                {/* Login */}
                <Link to="/LoggedInPage?type=login">
                  <button
                    className="
       font-Roboto text-md px-5 py-2.5
        rounded-md
        border
        border-orange-500
        text-orange-500

        font-semibold
        hover:bg-orange-50
        transition
        duration-200
        focus:outline-none
        focus:ring-2
        focus:ring-orange-400
      "
                  >
                    Login
                  </button>
                </Link>
              </div>
            ) : (
              <div className="relative group cursor-pointer">
                <div className="flex items-center gap-2">
                  <img  src={getImageUrl(user.image)} className="w-9 h-9 rounded-full" />
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
