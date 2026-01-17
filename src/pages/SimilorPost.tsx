import React, { useEffect, useState } from "react";
import { getSimilorPostData } from "../services/PostServices";
import Error from "../components/Error";
import Loader from "../components/Loader";
import PostCardOne from "../components/PostCardOne";
import { Post } from "../types/postType";

interface SimilorPostProps {
  id?: string;
}

const SimilorPost: React.FC<SimilorPostProps> = ({ id }) => {
  const [similorPosts, setSimilorPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchSimilorsPosts = async () => {
      try {
        setLoading(true);
        setError("");

        const res: Post[] = await getSimilorPostData(id as string);
        setSimilorPosts(res);
      } catch {
        setError("Failed to load similar posts");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSimilorsPosts();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;

  if (similorPosts.length === 0) return null;

  return (
    <div className="p-5 bg-gray-50 space-y-3">
      <h1 className="text-xl font-semibold font-Roboto">
        Similar Posts
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {similorPosts.map((post) => (
          <PostCardOne key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default SimilorPost;
