import React, { useEffect } from "react";
import Header from "../components/Header";
import { IoIosSearch } from "react-icons/io";
import { LuFileSpreadsheet } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../Redux Toolkit/Store";
import { fetchAllPosts } from "../Redux Toolkit/slice/PostSlice";
import { Link } from "react-router-dom";
import conf from "../config/Conf";

const CategoryResults = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { filteredPostByCategory, loading, error } = useSelector(
    (state: RootState) => state.postsData
  );

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  return (
    <>
     
      <div className="space-y-8">
        <div className="space-y-5 p-5 shadow">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredPostByCategory?.map((post) => (
              <Link
                to={`/singleBlogPage/${post._id}`}
                key={post._id}
                className="space-y-3 bg-white p-3 shadow rounded-md"
              >
                <h2 className="font-Poppins text-base font-medium hover:underline">
                  {post.category.name}
                </h2>

                <div className="w-full h-56 overflow-hidden">
                  <img
                    className="w-full h-full shadow-lg object-cover
                        transition-transform duration-300 ease-in-out hover:scale-110 rounded"
                    src={
                      post.image
                        ? `${conf.BaseURL}${conf.ImageUploadUrl}/${post.image}`
                        : ""
                    }
                    alt={post.title}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <h2 className="font-medium font-RobotoFlex text-sm hover:underline">
                    {post.title}
                  </h2>
                  <p className="font-Inter font-light text-xs line-clamp-3">
                    {post.content}
                  </p>
                  <div className="flex gap-1 items-center text-orange-600 cursor-pointer">
                    <LuFileSpreadsheet />
                    <span className="font-medium text-sm font-Roboto">
                      Read more
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryResults;
