import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { FaRegThumbsUp, FaRegThumbsDown, FaReplyAll } from "react-icons/fa6";
import {
  addCommentData,
  dislikeCommentData,
  getCommentByPostData,
  likeCommentData,
} from "../services/CommentService";
import conf from "../config/Conf";
const Comment = ({ postId, singlePosts }) => {
  const [comment, setComment] = useState("");
  const [allComment, setAllComments] = useState<any[]>([]);
  const [reactionLoading, setReactionLoading] = useState<string | null>(null);

  console.log("allComment", allComment);

  const token = localStorage.getItem("token");
  let userId: string | null = null;

  if (token) {
    try {
      interface DecodedTokenType {
        id: string;
        role: string;
        iat: number;
        exp: number;
      }
      const decodedToken: DecodedTokenType = jwtDecode(token);
      userId = decodedToken?.id;
    } catch (error) {
      console.error("Invalid Token", error);
    }
  }

  const fetchAllComment = async () => {
    try {
      const data = await getCommentByPostData(postId);
      console.log("msworld", data);

      setAllComments(data);
    } catch (error) {
      console.log("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchAllComment();
  }, [postId]);

  const handleAddComment = async (e) => {
    e.preventDefault();

    const data = {
      content: comment,
      post: postId,
      user: userId,
    };

    try {
      const response = await addCommentData(data);

      console.log("response", response);

      alert("Comment added successfully");
      setComment("");
      fetchAllComment();
    } catch (error) {
      console.error(
        "Error adding comment:",
        error.response?.data || error.message
      );
    }
  };

  // const handleLike = async (commentId: string) => {
  //   if (!userId) return alert("Please login to like comments");

  //   try {
  //     const alreadyLiked = allComment
  //       ?.find((c) => c._id === commentId)
  //       ?.likesComment?.includes(userId);

  //     const url = alreadyLiked
  //       ? `${conf.BaseURL}/comments/${commentId}/unlike`
  //       : `${conf.BaseURL}/comments/${commentId}/likeComment`;

  //     const res = await axios.post(
  //       url,
  //       {},
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );

  //     const updatedComment = res.data.comment;

  //     setAllComments((prev) =>
  //       prev.map((c) => (c._id === updatedComment._id ? updatedComment : c))
  //     );
  //   } catch (error) {
  //     console.error("Error liking comment:", error);
  //   }
  // };

  // const handleLike = async () => {
  //   try {
  //     if (likeStatus === "like") {
  //       await unlikePostData(postId, {
  //         author: currentUserId,
  //       });

  //       setLikeStatus(null);
  //       setTotalLikes((prev) => prev - 1);
  //       alert("Post unlike succefull");
  //     } else {
  //       const data = {
  //          post: postId,
  //         author: currentUserId,
  //       }
  //       await likePostData(data)
  //       setLikeStatus("like");
  //       setTotalLikes((prev) => prev + 1);
  //       alert("Post like succefull");
  //     }
  //   } catch (error) {
  //     console.log(error.response.data.message);
  //   }
  // };
  // const handleLike = async (commentId: string) => {
  //   if (!userId) {
  //     alert("Please login to like comment");
  //     return;
  //   }

  //   try {
  //     const res = await likeCommentData(commentId);

  //     const updatedComment = res.comment;

  //     setAllComments((prev) =>
  //       prev.map((c) => (c._id === updatedComment._id ? updatedComment : c))
  //     );
  //   } catch (error: any) {
  //     console.log(error.response?.data?.message || error.message);
  //   }
  // };

  const handleLike = async (commentId: string) => {
    if (!userId) {
      alert("Please login to like comment");
      return;
    }

    if (reactionLoading) return;

    try {
      setReactionLoading(commentId);
      const res = await likeCommentData(commentId);
      const updatedComment = res.comment;

      setAllComments((prev) =>
        prev.map((c) => (c._id === updatedComment._id ? updatedComment : c))
      );
    } catch (error: any) {
      console.error(error.response?.data?.message || error.message);
    } finally {
      setReactionLoading(null);
    }
  };

  // const handleDislike = async (commentId: string) => {
  //   if (!userId) {
  //     alert("Please login to dislike comment");
  //     return;
  //   }

  //   try {
  //     const res = await dislikeCommentData(commentId);

  //     const updatedComment = res.comment;

  //     setAllComments((prev) =>
  //       prev.map((c) => (c._id === updatedComment._id ? updatedComment : c))
  //     );
  //   } catch (error: any) {
  //     console.error(error.response?.data?.message || error.message);
  //   }
  // };

  const handleDislike = async (commentId: string) => {
    if (!userId) {
      alert("Please login to dislike comment");
      return;
    }

    if (reactionLoading) return;

    try {
      setReactionLoading(commentId);
      const res = await dislikeCommentData(commentId);
      const updatedComment = res.comment;

      setAllComments((prev) =>
        prev.map((c) => (c._id === updatedComment._id ? updatedComment : c))
      );
    } catch (error: any) {
      console.error(error.response?.data?.message || error.message);
    } finally {
      setReactionLoading(null);
    }
  };

  return (
    <div className="bg-white p-6 space-y-4">
      <h1 className="text-xl font-semibold font-Roboto">Comments</h1>

      {/* Add Comment Form */}
      <div className="bg-white rounded-md border border-black/15 space-y-8 p-5">
        {token ? (
          <div className="h-auto bg-gray-100 shadow rounded-xl p-4">
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
              ></textarea>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-orange-500 text-white font-Inter hover:scale-105 duration-500 text-sm px-4 py-2 rounded-md font-medium"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        ) : (
          <p className="text-gray-600 text-sm font-Inter">
            Please{" "}
            <a href="/login" className="text-orange-500 underline">
              login
            </a>{" "}
            to add a comment.
          </p>
        )}
      </div>

      {/* All Comments Section */}
      <div className="space-y-5">
        <h4 className="text-base font-medium font-Roboto">All Comments</h4>
        <div className="px-4 h-60 overflow-y-auto">
          {allComment?.length > 0 ? (
            allComment.map((comment) => (
              <div key={comment._id} className="border-b py-3 flex gap-2">
                <div>
                  {" "}
                  {comment?.user?.image ? (
                    <img
                      className="w-10 h-10 rounded-full"
                      src={`${conf.BaseURL}${conf.ImageUploadUrl}/${comment.user.image}`}
                      alt={comment?.user?.name}
                    />
                  ) : (
                    <img
                      className="w-10 h-10 rounded-full"
                      src="https://cdn-icons-png.flaticon.com/512/8792/8792047.png"
                      alt="Default User"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-[2px]">
                  <h4 className="text-sm font-Inter font-medium">
                    {comment?.user?.name || "Name not available"}
                  </h4>

                  <p className="text-gray-700 text-[12px] font-Inter">
                    {comment.content}
                  </p>
                  <div className="flex items-center gap-3">
                    {/* LIKE */}
                    <div
                      className={`text-[12px] flex gap-1 items-center cursor-pointer transition ${
                        comment.likesComment?.some(
                          (u) => u === userId || u?._id === userId
                        )
                          ? "text-blue-500"
                          : "text-gray-500"
                      } ${
                        comment.dislikescomment?.some(
                          (u) => u === userId || u?._id === userId
                        )
                          ? "opacity-50 pointer-events-none"
                          : ""
                      }`}
                      onClick={() => handleLike(comment._id)}
                    >
                      <FaRegThumbsUp />
                      <span>{comment.likesComment?.length || 0}</span>
                    </div>

                    {/* DISLIKE */}
                    <div
                      className={`text-[12px] flex gap-1 items-center cursor-pointer transition ${
                        comment.dislikescomment?.some(
                          (u) => u === userId || u?._id === userId
                        )
                          ? "text-red-500"
                          : "text-gray-500"
                      } ${
                        comment.likesComment?.some(
                          (u) => u === userId || u?._id === userId
                        )
                          ? "opacity-50 pointer-events-none"
                          : ""
                      }`}
                      onClick={() => handleDislike(comment._id)}
                    >
                      <FaRegThumbsDown />
                      <span>{comment.dislikescomment?.length || 0}</span>
                    </div>
                  </div>

                  {/* <div className="flex items-center gap-1">
                      <FaReplyAll className="text-gray-500" />
                      <span className="text-gray-500 text-[12px]">Reply</span>
                    </div> */}
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
