import React, { useState, useEffect } from "react";
import PostCardFive from "../components/PostCardFive";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getSimilorPostData } from "../services/PostServices";

const SimilorPost = ({ id }) => {
  const [similorPosts, setSimilorPosts] = useState<any>([]);

  console.log("similorPosts", similorPosts);

  useEffect(() => {
    const fetchSimilorsPosts = async () => {
      try {
       const res = await getSimilorPostData(id)
        setSimilorPosts(res);
      } catch (error) {
        console.log("Error fetching popular posts:", error);
      }
    };

    fetchSimilorsPosts();
  }, []);

  return (
    <>
      <div className="p-5 bg-gray-50 space-y-3">
        <h1 className="text-xl font-semibold font-Roboto">Similor Posts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          
          {similorPosts.map((post, index) => (
            <PostCardFive key={index} post={post} />
          ))}
          </div>
        
      </div>
    </>
  );
};

export default SimilorPost;
