import React, { useState, useEffect } from "react";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import { LuMessageCircleMore } from "react-icons/lu";
import axios from "axios";
import { likePostData, unlikePostData } from "../services/LikeUnlikePostService";
import { disLikePost } from "../../../Backend/controllers/dislikeController";
import { dislikePostData, undislikePostData } from "../services/dislikeUndislikeService";
import { Link } from "react-router-dom";

const LikeDislikeComment = ({
  postId,
  likes,
  dislikes,
  currentUserId,
  comments,
}) => {
  console.log("postId", postId);
  console.log("likes", likes);
  console.log("currentUserId", currentUserId);

  const [likeStatus, setLikeStatus] = useState<"like" | "dislike" | null>(null);
  const [totalLikes, setTotalLikes] = useState(likes.length);
  const [totalDislikes, setTotalDislikes] = useState(dislikes.length);

  useEffect(() => {
    if (likes.includes(currentUserId)) {
      setLikeStatus("like");
    } else {
      setLikeStatus(null);
    }
  }, [likes, currentUserId]);

  useEffect(() => {
    if (likes.includes(currentUserId)) {
      setLikeStatus("like");
    } else if (dislikes.includes(currentUserId)) {
      setLikeStatus("dislike");
    } else {
      setLikeStatus(null);
    }
  }, [likes, dislikes, currentUserId]);

  const handleLike = async () => {
    try {
      if (likeStatus === "like") {
        await unlikePostData(postId, {
          author: currentUserId,
        });

        setLikeStatus(null);
        setTotalLikes((prev) => prev - 1);
        alert("Post unlike succefull");
      } else {
        const data = {
           post: postId,
          author: currentUserId,
        }
        await likePostData(data)
        setLikeStatus("like");
        setTotalLikes((prev) => prev + 1);
        alert("Post like succefull");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleDislike = async () => {
    try {
      if (likeStatus === "dislike") {
         await undislikePostData(postId, {
          author: currentUserId,
        });

        setLikeStatus(null);
        setTotalDislikes((prev) => prev - 1);
        alert("Post undislike successful");
      } else {
        // if already liked, remove like first
        if (likeStatus === "like") {
         await unlikePostData(postId, {
          author: currentUserId,
        });
          setTotalLikes((prev) => prev - 1);
        }

        const data = {
           post: postId,
          author: currentUserId,
        }
        await dislikePostData(data)

        setLikeStatus("dislike");
        setTotalDislikes((prev) => prev + 1);
        alert("Post dislike successful");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <div className="flex gap-3 justify-end">
        {/* Like */}
        <div
          onClick={handleLike}
          className={`${
            likeStatus === "like" ? "text-red-500" : "text-gray-500"
          }`}
        >
          <div className="flex gap-1 items-center">
            <span className="cursor-pointer">
              {likeStatus === "like" ? <AiFillLike /> : <AiOutlineLike />}
            </span>
            <span>{totalLikes}</span>
          </div>
        </div>

        {/* Dislike */}
        <div
          onClick={handleDislike}
          className={`cursor-pointer ${
            likeStatus === "dislike" ? "text-blue-500" : "text-gray-500"
          }`}
        >
          <div className="flex items-center gap-1">
            {likeStatus === "dislike" ? (
              <AiFillDislike />
            ) : (
              <AiOutlineDislike />
            )}
            <span>{totalDislikes}</span>
          </div>
        </div>

        {/* Comment */}
        <Link to={`singleBlogPage/${postId}`} className="flex items-center gap-1 text-gray-500 text-[15px] cursor-pointer">
          <LuMessageCircleMore />
          <span>{comments.length}</span>
        </Link>
      </div>
    </>
  );
};

export default LikeDislikeComment;
