import React, { useState, useEffect } from "react";
import PostCardFive from "../components/PostCardFive";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getSimilorPostData } from "../services/PostServices";
import Error from "../components/Error";
import Loader from "../components/Loader";

const SimilorPost = ({ id }) => {
  const [similorPosts, setSimilorPosts] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  console.log("similorPosts", similorPosts);

  useEffect(() => {
    const fetchSimilorsPosts = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getSimilorPostData(id);
        setSimilorPosts(res);
      } catch (err) {
        setError("Failed to load similar posts");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSimilorsPosts();
  }, [id]);

  if (loading) return <Loader />;

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="p-5 bg-gray-50 space-y-3">
      <h1 className="text-xl font-semibold font-Roboto">Similar Posts</h1>
      {similorPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {similorPosts.map((post, index) => (
            <PostCardFive key={index} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No similar posts found.</p>
      )}
    </div>
  );
};

export default SimilorPost;
