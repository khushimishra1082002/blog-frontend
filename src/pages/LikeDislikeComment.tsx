import React, { useState, useEffect } from "react";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import { LuMessageCircleMore } from "react-icons/lu";
import axios from "axios";

const LikeDislikeComment = ({ postId, likes, dislikes, currentUserId,comments }) => {
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
        await axios.delete(
          `http://localhost:5000/api/likes/unlikePost/${postId}`,
          {
            data: { author: currentUserId },
          }
        );
        setLikeStatus(null);
        setTotalLikes((prev) => prev - 1);
        alert("Post unlike succefull");
      } else {
        await axios.post(`http://localhost:5000/api/likes/likePost`, {
          post: postId,
          author: currentUserId,
        });
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
        await axios.delete(
          `http://localhost:5000/api/dislikes/unDislikePost/${postId}`,
          {
            data: { author: currentUserId },
          }
        );
        setLikeStatus(null);
        setTotalDislikes((prev) => prev - 1);
        alert("Post undislike successful");
      } else {
        // if already liked, remove like first
        if (likeStatus === "like") {
          await axios.delete(
            `http://localhost:5000/api/likes/unlikePost/${postId}`,
            {
              data: { author: currentUserId },
            }
          );
          setTotalLikes((prev) => prev - 1);
        }
  
        await axios.post(`http://localhost:5000/api/dislikes/disLikePost`, {
          post: postId,
          author: currentUserId,
        });
  
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
         <span>
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
        {likeStatus === "dislike" ? <AiFillDislike /> : <AiOutlineDislike />}
        <span>{totalDislikes}</span>
        </div>
        </div>

        {/* Comment */}
        <div className="flex items-center gap-1 text-gray-500 text-[15px] cursor-pointer">
          <LuMessageCircleMore />
          <span>{comments.length}</span>
        </div>
      </div>
    </>
  );
};

export default LikeDislikeComment;
