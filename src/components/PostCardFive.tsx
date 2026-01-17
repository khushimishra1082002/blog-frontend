import React from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../utils/getImageUrls";

const PostCardFive = ({ post }) => {
  return (
    <Link to={`/singleBlogPage/${post._id}`} className="block">
      <div className="bg-white p-4 shadow-lg rounded space-y-3 cursor-pointer">
        
        {/* Image */}
        <div className="w-full h-56 overflow-hidden">
          <img
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110 rounded"
            src={getImageUrl(post.image)}
            alt={post.title}
          />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <span className="font-Roboto text-gray-600 text-sm">
            {new Date(post.createdAt).toDateString()}
          </span>

          <h2 className="text-base font-Inter font-medium hover:underline line-clamp-2">
            {post.title}
          </h2>

          <p className="font-Inter text-[12px] font-light line-clamp-3">
            {post.content}
          </p>

          {/* Author */}
          <div className="flex items-center gap-2 pt-2">
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={getImageUrl(post?.author?.image)}
                alt={post?.author?.name || "User"}
              />
            </div>

            <span className="font-Roboto text-sm">
              {post?.author?.name || "Unknown User"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCardFive;
