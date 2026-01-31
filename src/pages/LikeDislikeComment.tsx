import React, { useEffect, useState } from "react";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import { LuMessageCircleMore } from "react-icons/lu";
import { Link } from "react-router-dom";

import {
  likePostData,
  unlikePostData,
} from "../services/LikeUnlikePostService";

import {
  dislikePostData,
  undislikePostData,
} from "../services/dislikeUndislikeService";

type LikeStatus = "like" | "dislike" | null;

interface LikeDislikeCommentProps {
  postId: string;
  likes: string[];
  dislikes: string[];
  currentUserId?: string;
  comments: unknown[];
}

const LikeDislikeComment: React.FC<LikeDislikeCommentProps> = ({
  postId,
  likes,
  dislikes,
  currentUserId,
  comments,
}) => {
  const [likeStatus, setLikeStatus] = useState<LikeStatus>(null);
  const [totalLikes, setTotalLikes] = useState<number>(likes.length);
  const [totalDislikes, setTotalDislikes] = useState<number>(dislikes.length);

  useEffect(() => {
    if (!currentUserId) {
      setLikeStatus(null);
      return;
    }

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
      if (!currentUserId) return;

      if (likeStatus === "like") {
        await unlikePostData(postId, { author: currentUserId });

        setLikeStatus(null);
        setTotalLikes((prev) => prev - 1);
      } else {
        const formData = new FormData();
        formData.append("post", postId);
        formData.append("author", currentUserId);

        await likePostData(formData);

        if (likeStatus === "dislike") {
          setTotalDislikes((prev) => prev - 1);
        }

        setLikeStatus("like");
        setTotalLikes((prev) => prev + 1);
      }
    } catch (error: any) {
      console.error(error?.response?.data?.message || error.message);
    }
  };

  const handleDislike = async () => {
    try {
      if (!currentUserId) return;

      if (likeStatus === "dislike") {
        await undislikePostData(postId, { author: currentUserId });

        setLikeStatus(null);
        setTotalDislikes((prev) => prev - 1);
      } else {
        if (likeStatus === "like") {
          await unlikePostData(postId, { author: currentUserId });
          setTotalLikes((prev) => prev - 1);
        }

        const formData = new FormData();
        formData.append("post", postId);
        formData.append("author", currentUserId);

        await dislikePostData(formData);

        setLikeStatus("dislike");
        setTotalDislikes((prev) => prev + 1);
      }
    } catch (error: any) {
      console.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex gap-3 justify-end">
      {/* LIKE */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleLike();
        }}
        className={`cursor-pointer ${
          likeStatus === "like" ? "text-red-500" : "text-gray-500"
        }`}
      >
        <div className="flex gap-1 items-center">
          {likeStatus === "like" ? <AiFillLike /> : <AiOutlineLike />}
          <span>{totalLikes}</span>
        </div>
      </div>

      {/* DISLIKE */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleDislike();
        }}
        className={`cursor-pointer ${
          likeStatus === "dislike" ? "text-blue-500" : "text-gray-500"
        }`}
      >
        <div className="flex items-center gap-1">
          {likeStatus === "dislike" ? <AiFillDislike /> : <AiOutlineDislike />}
          <span>{totalDislikes}</span>
        </div>
      </div>

      {/* COMMENTS */}
      <Link
        to={`/singleBlogPage/${postId}`}
        className="flex items-center gap-1 text-gray-500 text-[15px]"
      >
        <LuMessageCircleMore />
        <span>{comments.length}</span>
      </Link>
    </div>
  );
};

export default LikeDislikeComment;
