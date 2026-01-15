import React, { useState, useEffect } from "react";
import PostCardFive from "../components/PostCardFive";
import { Link } from "react-router-dom";
import { getRecommendedPostData } from "../services/PostServices";
import Loader from "../components/Loader";
import Error from "../components/Error";

const RecommendedPost = () => {
  const [recommendedPost, setRecommendedPost] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendedPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getRecommendedPostData();
        setRecommendedPost(res);
      } catch (err: any) {
        setError(
          err?.response?.data?.message || "Failed to load recommended posts"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedPosts();
  }, []);

  if (loading) return <Loader />;

  if (error) {
    return <Error message={error} />;
  }

  if (!recommendedPost || recommendedPost.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">
        No Recommended Posts Found
      </p>
    );
  }

  return (
    <div className="p-5 space-y-4">
      <h1 className="text-xl font-semibold font-Roboto">Recommended Posts</h1>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
        gap-2 bg-gray-100 p-5"
      >
        {recommendedPost.map((post) => (
          <Link key={post._id} to={`/singleBlogPage/${post._id}`}>
            <PostCardFive post={post} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendedPost;
