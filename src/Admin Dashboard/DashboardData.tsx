import React, { useEffect } from "react";
import { FaRegNewspaper } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AllPostDataTable from "./posts/AllPostDataTable";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { RootState, AppDispatch } from "../Redux Toolkit/Store";
import { fetchAllPosts } from "../Redux Toolkit/slice/PostSlice";
import { fetchAllUsers } from "../Redux Toolkit/slice/UserSlice";
import { fetchAllCategory } from "../Redux Toolkit/slice/CategorySlice";

const DashboardData: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    posts,
    loading: postsLoading,
    error: postsError,
  } = useSelector((state: RootState) => state.postsData);

  const {
    users,
    loading: usersLoading,
    error: usersError,
  } = useSelector((state: RootState) => state.usersData);

  const {
    category,
    loading: categoryLoading,
    error: categoryError,
  } = useSelector((state: RootState) => state.categoryData);

  useEffect(() => {
    dispatch(fetchAllPosts());
    dispatch(fetchAllUsers());
    dispatch(fetchAllCategory());
  }, [dispatch]);

  const loading = postsLoading || usersLoading || categoryLoading;
  const error = postsError || usersError || categoryError;

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;

  return (
    <div className="h-full space-y-6">
      {/* Overview */}
      <div className="space-y-2">
        <h2 className="font-medium font-Poppins text-base">Overview</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {/* Posts */}
          <Link to="/dashboard/post">
            <div className="flex gap-3 justify-center items-center p-8 bg-white border border-black/15 rounded-md">
              <div className="w-12 h-12 rounded-full bg-purple-200 flex justify-center items-center">
                <FaRegNewspaper className="text-purple-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold tracking-wider">
                  {posts.length}
                </span>
                <h4 className="font-Inter text-sm">Total Posts</h4>
              </div>
            </div>
          </Link>

          {/* Users */}
          <Link to="/dashboard/user">
            <div className="flex gap-3 justify-center items-center p-8 bg-white border border-black/15 rounded-md">
              <div className="w-12 h-12 rounded-full bg-cyan-200 flex justify-center items-center">
                <FaRegNewspaper className="text-cyan-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold tracking-wider">
                  {users.length}
                </span>
                <h4 className="font-Inter text-sm">Total Users</h4>
              </div>
            </div>
          </Link>

          {/* Categories */}
          <Link to="/dashboard/category">
            <div className="flex gap-3 justify-center items-center p-8 bg-white border border-black/15 rounded-md">
              <div className="w-12 h-12 rounded-full bg-red-200 flex justify-center items-center">
                <FaRegNewspaper className="text-red-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold tracking-wider">
                  {category.length}
                </span>
                <h4 className="font-Inter text-sm">Total Category</h4>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <AllPostDataTable />
    </div>
  );
};

export default DashboardData;
