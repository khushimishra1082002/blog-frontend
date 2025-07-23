import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { FaRegThumbsUp, FaRegThumbsDown, FaReplyAll } from "react-icons/fa6";

const Comment = ({ postId, singlePosts }) => {
  const [comment, setComment] = useState("");
  const [allComment, setAllComments] = useState<any>(null);

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
      const { data } = await axios.get(
        `http://localhost:5000/api/comments/getCommentByPost/${postId}`
      );
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

    try {
      const response = await axios.post(
        "http://localhost:5000/api/comments/addComment",
        {
          content: comment,
          post: postId,
          user: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

  return (
    <div className="bg-white p-6 space-y-4">
      <h1 className="text-xl font-semibold font-Roboto">Comments</h1>

      {/* Add Comment Form */}
      <div className="bg-white rounded-md border border-black/15 space-y-8 p-5">
        <div className="h-auto bg-gray-100 shadow rounded-xl p-4">
          <h3 className="text-base font-medium mb-3 font-Inter">Add Comment</h3>
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
      </div>

      {/* All Comments Section */}
      <div className="space-y-5">
        <h4 className="text-base font-medium font-Roboto">All Comments</h4>
        <div className="px-4 h-60 overflow-y-auto">
          {allComment?.length > 0 ? (
            allComment.map((comment) => (
              <div key={comment._id} className="border-b py-3 flex gap-2">
                <div>
                  {comment?.user?.image ? (
                    <img
                      className=" w-12 h-12 rounded-full"
                      src={`http://localhost:5000/uploads/${comment.user.image}`}
                      alt={comment?.user?.name}
                    />
                  ) : (
                    <span>Image not available</span>
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
                    <div className="text-[12px] flex gap-1 items-center">
                      <FaRegThumbsUp className="text-gray-500" />
                      <span>0</span>
                    </div>
                    <div className="text-[12px] flex gap-1 items-center">
                      <FaRegThumbsDown className="text-gray-500" />
                      <span>0</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaReplyAll className="text-gray-500" />
                      <span className="text-gray-500 text-[12px]">Reply</span>
                    </div>
                  </div>
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
