import React, { useState, useEffect } from "react";
import PostCardTwo from "../components/PostCardTwo";
import PostCardThree from "../components/PostCardThree";
import { Link } from "react-router-dom";
import { getRecentPostData } from "../services/PostServices";
import Loader from "../components/Loader";
import Error from "../components/Error";

const RecentPost = () => {
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await getRecentPostData();
        setRecentPosts(res);
      } catch (err) {
        setError("Failed to load recent posts");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPosts();
  }, []);

  return (
    <div className="shadow-lg bg-white rounded-md flex flex-col gap-2 p-5 border border-black/10">
      <h2 className="font-Inter text-xl font-semibold">Recent Posts</h2>

    
      {loading && <Loader />}

    
      {!loading && error && <Error message={error} />}

  
      {!loading && !error && recentPosts.length === 0 && (
        <Error message="No recent posts available" />
      )}

    
      {!loading && !error && recentPosts.length > 0 && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            {recentPosts.slice(0, 4).map((post) => (
              <Link key={post._id} to={`singleBlogPage/${post._id}`}>
                <PostCardTwo post={post} />
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {recentPosts.slice(4, 6).map((post) => (
              <Link key={post._id} to={`singleBlogPage/${post._id}`}>
                <PostCardThree post={post} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentPost;
