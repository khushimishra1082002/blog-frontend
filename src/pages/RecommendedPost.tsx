import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCardFive from "../components/PostCardFive";
import { Link } from "react-router-dom";
import { getRecommendedPostData } from "../services/PostServices";

const RecommendedPost = () => {
  const [recommendedPost, setRecommendedPost] = useState<any>([]);

  useEffect(() => {
    const fetchRecommendedPosts = async () => {
      try {
        const res  = await getRecommendedPostData()
        setRecommendedPost(res);
      } catch (error) {
        console.log("Error fetching recommended posts:", error);
      }
    };
    fetchRecommendedPosts();
  }, []);

  return (
    <div className="p-5 space-y-4">
      <h1 className="text-xl font-semibold font-Roboto">
        Recommended Posts
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
       gap-2 bg-gray-100 p-5">
        {recommendedPost.map((post, index) => (
          <Link to = {`singleBlogPage/${post._id}`}>
          <PostCardFive key={post._id} post={post} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendedPost;
