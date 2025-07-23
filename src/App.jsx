import React from "react";
import { Routes, Route } from "react-router-dom";
import Mainpage from "./pages/Mainpage";
import Homepage from "./pages/Homepage";
import LoggedInPage from "./pages/LoggedInPage";
import Profile from "./pages/Profile";
import CategoryResults from "./pages/CategoryResults";
import SinglePost from "./pages/SinglePost";
import Dashboard from "./Admin Dashboard/Dashboard";
import DashboardHeader from "./Admin Dashboard/DashboardHeader";
import DashboardSidebar from "./Admin Dashboard/DashboardSidebar";
import DashboardData from "./Admin Dashboard/DashboardData";
import AllPostDataTable from "./Admin Dashboard/posts/AllPostDataTable";
import AllUsersDataTable from "./Admin Dashboard/Users/AllUsersDataTable";
import AddNewPost from "./Admin Dashboard/posts/AddNewPost";
import AddNewUser from "./Admin Dashboard/Users/AddNewUser";
import ProfileDetails from "./Admin Dashboard/Profile/ProfileDetails";
import EditPost from "./Admin Dashboard/posts/EditPost";
import EditUser from "./Admin Dashboard/Users/EditUser";
import ChangePassword from "./Admin Dashboard/Profile/ChangePassword";
import AllCategoryDataTable from "./Admin Dashboard/Category/AllCategoryDataTable";
import AddNewCategory from "./Admin Dashboard/Category/AddNewCategory";
import EditCategory from "./Admin Dashboard/Category/EditCategory";
import ScrollTop from "./components/ScrollTop";
import AddPostByUser from "./pages/AddPostByUser";
import SearchResults from "./pages/SearchResults";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import EditProfile from "./Admin Dashboard/Profile/EditProfile";
import AllPosts from "./pages/AllPosts";
import Header from "./components/Header";
import SocialIcon from "./components/SocialIcon";
import { useLocation } from "react-router-dom";
import { getDecodedToken } from "./utils/tokenUtils";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const decodeToken = getDecodedToken();
  const role = decodeToken?.role;
  console.log("role", role);

  return (
    <>
      <ScrollTop />

      <Routes>
        <Route path="/" element={<Mainpage />}>
          <Route path="home" element={<Homepage />} />
          <Route index element={<Homepage />} />
          <Route path="LoggedInPage" element={<LoggedInPage />} />
          <Route path="profilePage" element={<Profile />} />
          <Route path="singleBlogPage/:id" element={<SinglePost />} />
          <Route path="CategoryResults" element={<CategoryResults />} />
          <Route path="addPost" element={<AddPostByUser />} />
          <Route path="searchResults" element={<SearchResults />} />
          <Route path="allPosts" element={<AllPosts />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        <Route
          path="dashboard"
          element={
            // <ProtectedRoute isAllowed={role === "admin"}>
              <Dashboard />
            // </ProtectedRoute>
          }
        >
          <Route path="dashboardHeader" element={<DashboardHeader />} />
          <Route path="dashboardSidebar" element={<DashboardSidebar />} />
          <Route path="dashboardData" element={<DashboardData />} />
          <Route index element={<DashboardData />} />
          <Route path="post" element={<AllPostDataTable />} />
          <Route path="user" element={<AllUsersDataTable />} />
          <Route path="addNewPost" element={<AddNewPost />} />
          <Route path="addNewPostByUser" element={<AddPostByUser />} />
          <Route path="addNewUser" element={<AddNewUser />} />
          <Route path="profileDetails" element={<ProfileDetails />} />
          <Route path="editPost/:id" element={<EditPost />} />
          <Route path="editUser/:id" element={<EditUser />} />
          <Route path="changePassword" element={<ChangePassword />} />
          <Route path="category" element={<AllCategoryDataTable />} />
          <Route path="addNewCategory" element={<AddNewCategory />} />
          <Route path="editCategory/:id" element={<EditCategory />} />
          <Route path="editProfile" element={<EditProfile />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
