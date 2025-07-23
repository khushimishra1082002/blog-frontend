import React, { useState, useEffect } from "react";
import PostCardTwo from "../components/PostCardTwo";
import PostCardThree from "../components/PostCardThree";
import axios from "axios";
import { Link } from "react-router-dom";

const RecentPost = () => {
  const [recentPosts, setRecentPosts] = useState<any>([]);
  console.log("recentPosts", recentPosts);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/blog-posts/recentPost"
        );
        console.log(data);
        setRecentPosts(data);
      } catch (error) {
        console.log("Error fetching popular posts:", error);
      }
    };

    fetchRecentPosts();
  }, []);
  return (
    <>
      <div
        className="shadow-lg bg-white rounded-md flex flex-col gap-2 p-5
       border border-black/10 "
      >
        <h2 className="  font-Inter  text-xl font-semibold">Recent Posts</h2>
       <div className="space-y-3">
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          {recentPosts.slice(0, 4).map((post) => (
            <Link to={`singleBlogPage/${post._id}`}>
            <PostCardTwo key={post._id} post={post} />
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {recentPosts.slice(4, 6).map((post) => (
             <Link to={`singleBlogPage/${post._id}`}>
             <PostCardThree key={post._id} post={post} />
             </Link>
            
          ))}
        </div>
       </div>
      </div>
    </>
  );
};

export default RecentPost;
