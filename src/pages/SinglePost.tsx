import React, { useState, useEffect } from "react";
import { FaThumbsUp } from "react-icons/fa6";
import { LuMessageCircleMore } from "react-icons/lu";
import { useParams } from "react-router-dom";
import SimilorPost from "./SimilorPost";
import Comment from "../pages/Comment";
import { getSinglePostData } from "../services/PostServices";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { getImageUrl } from "../utils/getImageUrls";
import { Post } from "../types/postType";

const SinglePost: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [singlePosts, setSinglePosts] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchSinglePosts = async () => {
      try {
        setLoading(true);
        setError("");
        const data: Post = await getSinglePostData(id!);
        setSinglePosts(data);
      } catch {
        setError("Failed to load post data");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSinglePosts();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;
  if (!singlePosts) return null;

  const likeCount = Array.isArray(singlePosts.likes)
    ? singlePosts.likes.length
    : (singlePosts.likes ?? 0);

  const commentCount = Array.isArray(singlePosts.comments)
    ? singlePosts.comments.length
    : Number(singlePosts.comments) || 0;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-5 py-7">
        {/* Image */}
        <div className="w-full h-full overflow-hidden">
          <img
            className="w-full h-full object-cover rounded hover:scale-110 transition"
            src={getImageUrl(singlePosts.image)}
            alt={singlePosts.title}
          />
        </div>

        {/* Content */}
        <div className="space-y-5">
          <h2 className="text-2xl font-medium font-Inter">{singlePosts.title}</h2>

          {singlePosts.createdAt && (
            <span className="text-gray-500">
              {new Date(singlePosts.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
          )}

          <p className="text-sm font-Poppins">{singlePosts.content}</p>

          {/* Author */}
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={
                  singlePosts.author?.image
                    ? getImageUrl(singlePosts.author.image)
                    : "https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
                }
                alt={singlePosts.author?.name || "User"}
              />

              <div>
                <h4 className="font-medium">
                  {singlePosts.author?.name || "Unknown User"}
                </h4>
                <span className="text-xs text-cyan-500">
                  {singlePosts.author?.email}
                </span>
              </div>
            </div>


            {/* Stats */}
            <div className="flex gap-4 text-gray-500 text-sm">
              <span className="flex gap-1 items-center">
                <FaThumbsUp />
                {likeCount}
              </span>

              <span className="flex gap-1 items-center">
                <LuMessageCircleMore />
                {commentCount}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Comment postId={id!} singlePosts={singlePosts} />
      <SimilorPost id={id} />
    </>
  );
};

export default SinglePost;
