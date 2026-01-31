import React, { useState, useEffect, FormEvent } from "react";
import { jwtDecode } from "jwt-decode";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa6";
import {
  addCommentData,
  dislikeCommentData,
  getCommentByPostData,
  likeCommentData,
} from "../services/CommentService";
import { getImageUrl } from "../utils/getImageUrls";

interface DecodedTokenType {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

interface UserType {
  _id: string;
  name: string;
  image?: string;
}

interface CommentType {
  _id: string;
  content: string;
  user: UserType;
  likesComment: (string | UserType)[];
  dislikescomment: (string | UserType)[];
}

interface CommentProps {
  postId: string;
  singlePosts?: unknown;
}

const Comment: React.FC<CommentProps> = ({ postId }) => {
  const [comment, setComment] = useState<string>("");
  const [allComment, setAllComments] = useState<CommentType[]>([]);
  const [reactionLoading, setReactionLoading] = useState<string | null>(null);

  const token = localStorage.getItem("token");
  let userId: string | null = null;

  if (token) {
    try {
      const decodedToken: DecodedTokenType = jwtDecode(token);
      userId = decodedToken.id;
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  const fetchAllComment = async () => {
    try {
      const data: CommentType[] = await getCommentByPostData(postId);
      setAllComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchAllComment();
  }, [postId]);

  const handleAddComment = async (e: FormEvent) => {
  e.preventDefault();

  if (!userId) return;

  const formData = new FormData();
  formData.append("content", comment);
  formData.append("post", postId);
  formData.append("user", userId);

  try {
    await addCommentData(formData);
    setComment("");
    fetchAllComment();
  } catch (error: any) {
    console.error(error?.response?.data || error.message);
  }
};


  const handleLike = async (commentId: string) => {
    if (!userId) {
      alert("Please login to like comment");
      return;
    }

    if (reactionLoading) return;

    try {
      setReactionLoading(commentId);
      const res = await likeCommentData(commentId);
      const updatedComment: CommentType = res.comment;

      setAllComments((prev) =>
        prev.map((c) => (c._id === updatedComment._id ? updatedComment : c)),
      );
    } catch (error: any) {
      console.error(error?.response?.data?.message || error.message);
    } finally {
      setReactionLoading(null);
    }
  };

  const handleDislike = async (commentId: string) => {
    if (!userId) {
      alert("Please login to dislike comment");
      return;
    }

    if (reactionLoading) return;

    try {
      setReactionLoading(commentId);
      const res = await dislikeCommentData(commentId);
      const updatedComment: CommentType = res.comment;

      setAllComments((prev) =>
        prev.map((c) => (c._id === updatedComment._id ? updatedComment : c)),
      );
    } catch (error: any) {
      console.error(error?.response?.data?.message || error.message);
    } finally {
      setReactionLoading(null);
    }
  };

  return (
    <div className="bg-white p-6 space-y-4">
      <h1 className="text-xl font-semibold font-Roboto">Comments</h1>

      {/* Add Comment */}
      <div className="bg-white rounded-md border border-black/15 space-y-8 p-5">
        {token ? (
          <div className="bg-gray-100 shadow rounded-xl p-4">
            <h3 className="text-base font-medium mb-3 font-Inter">
              Add Comment
            </h3>

            <form onSubmit={handleAddComment} className="flex flex-col gap-4">
              <textarea
                placeholder="Write your comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border-none px-3 py-2 rounded-md focus:outline-none font-Inter text-sm shadow"
                required
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-orange-500 text-white hover:scale-105 duration-300 text-sm px-4 py-2 rounded-md font-medium"
                >
                  Add Comment
                </button>
              </div>
            </form>
          </div>
        ) : (
          <p className="text-gray-600 text-sm font-Inter">
            Please{" "}
            <a href="/LoggedInPage?type=login" className="text-orange-500 underline">
              login
            </a>{" "}
            to add a comment.
          </p>
        )}
      </div>

      {/* All Comments */}
      <div className="space-y-5">
        <h4 className="text-base font-medium font-Roboto">All Comments</h4>

        <div className="px-4 h-60 overflow-y-auto">
          {allComment.length > 0 ? (
            allComment.map((comment) => (
              <div key={comment._id} className="border-b py-3 flex gap-2">
                <img
                  className="w-10 h-10 rounded-full"
                  src={
                    comment.user?.image
                      ? getImageUrl(comment.user.image)
                      : "https://cdn-icons-png.flaticon.com/512/8792/8792047.png"
                  }
                  alt={comment.user?.name}
                />

                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-medium font-Inter">
                    {comment.user?.name || "Name not available"}
                  </h4>

                  <p className="text-gray-700 text-[12px] font-Inter">
                    {comment.content}
                  </p>

                  {comment.user?._id !== userId && (
                    <div className="flex items-center gap-3">
                      {/* LIKE */}
                      <div
                        className={`text-[12px] flex gap-1 items-center cursor-pointer ${
                          comment.likesComment?.some(
                            (u) =>
                              u === userId || (u as UserType)?._id === userId,
                          )
                            ? "text-blue-500"
                            : "text-gray-500"
                        }`}
                        onClick={() => handleLike(comment._id)}
                      >
                        <FaRegThumbsUp />
                        <span>{comment.likesComment?.length || 0}</span>
                      </div>

                      {/* DISLIKE */}
                      <div
                        className={`text-[12px] flex gap-1 items-center cursor-pointer ${
                          comment.dislikescomment?.some(
                            (u) =>
                              u === userId || (u as UserType)?._id === userId,
                          )
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                        onClick={() => handleDislike(comment._id)}
                      >
                        <FaRegThumbsDown />
                        <span>{comment.dislikescomment?.length || 0}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
