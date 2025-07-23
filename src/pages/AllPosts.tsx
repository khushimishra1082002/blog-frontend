import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../Redux Toolkit/Store";
import { fetchAllPosts } from "../Redux Toolkit/slice/PostSlice";
import { Link } from "react-router-dom";
import LikeDislikeComment from "./LikeDislikeComment";
import { getDecodedToken } from "../utils/tokenUtils";

const AllPosts = () => {
  
  const dispatch = useDispatch<AppDispatch>();

  const [visibleCount, setVisibleCount] = useState(8);

  const { posts, loading, error } = useSelector(
    (state: RootState) => state.postsData
  );
  console.log(posts);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  

  const decodeToken = getDecodedToken();
  const userId = decodeToken?.id;


  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 8); // Load 8 more each click
  };


  return (
    <>
      <div className="bg-white p-5 space-y-4">
        <h1 className=" text-xl font-semibold font-Roboto">All Posts</h1>
       
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 gap-y-3">
          {posts.length > 0 ? (
            posts.slice(0, visibleCount).map((post: any) => {
              const formattedDate = new Date(post.createdAt).toLocaleDateString(
                "en-GB",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              );

              return (
                <div>
                  <div
                    key={post._id}
                    className="shadow-lg bg-white rounded-md flex flex-col gap-4 p-5
                    border border-black/5 
                     "
                  >
                    <span className=" font-Roboto text-gray-700 font-mdium text-sm">
                      {formattedDate}
                    </span>

                    <Link to={`singleBlogPage/${post._id}`}>
                      <h4
                        className=" text-xl font-Roboto font-medium hover:underline
                   line-clamp-2"
                      >
                        {post.title}
                      </h4>
                    </Link>
                    <p className="font-Inter text-[12px] font-light text-gray-800 line-clamp-4">
                      {post.content}
                    </p>

                    <div className="w-full h-56 overflow-hidden">
                      <img
                        className="w-full h-full shadow-lg object-cover
                        transition-transform duration-300 ease-in-out hover:scale-110 rounded"
                        src={
                          post.image
                            ? `http://localhost:5000/uploads/${post.image}`
                            : ""
                        }
                        alt={post.title}
                      />
                    </div>

                    <div className=" grid grid-cols-2 justify-between pt-2 ">
                      <div className="flex gap-2 items-center">
                        <div className="w-6 h-6 rounded-full">
                          <img
                            className=" w-full h-full rounded-full"
                            src={
                              post.author.image
                                ? `http://localhost:5000/uploads/${post.author.image}`
                                : ""
                            }
                          />
                        </div>
                        <span className=" font-Roboto text-sm ">
                          {post.author?.name}
                        </span>
                      </div>

                      {/* Like Dislike Comment */}
                      <LikeDislikeComment
                        postId={post._id}
                        likes={post.likes}
                        dislikes={post.dislikes}
                        currentUserId={userId}
                        comments={post.comments}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No Posts Found</p>
          )}
        </div>
        {visibleCount < posts.length && (
        <div className="flex justify-center w-full pt-4">
          <button
            onClick={handleViewMore}
            className="px-6 py-2 border border-black text-black font-medium rounded-full hover:bg-black hover:text-white duration-300"
          >
            View More
          </button>
        </div>
      )}
      </div>
    </>
  );
};

export default AllPosts;
