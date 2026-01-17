import React from "react";
import conf from "../config/Conf";
import { getImageUrl } from "../utils/getImageUrls";
import { Post } from "../types/postType";

interface PostCardTwoProps {
  post: Post;
}

const PostCardTwo: React.FC<PostCardTwoProps> = ({ post }) => {
  return (
    <div>
      <div className="space-y-3 shadow-md p-3">
        {/* Image */}
        <div className="w-full h-36 overflow-hidden">
          <img
            className="w-full h-full shadow-lg object-cover
            transition-transform duration-300 ease-in-out hover:scale-110 rounded"
            src={getImageUrl(post.image)}
            alt={post.title}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3">
          <span className="text-cyan-500 font-semibold text-[12px] font-Inter tracking-wider">
            {typeof post.category === "string"
              ? post.category
              : post.category?.name}
          </span>

          <h3 className="text-base font-RobotoFlex hover:underline line-clamp-1">
            {post.title}
          </h3>

          <p className="text-[11px] font-Inter font-light line-clamp-3">
            {post.content}
          </p>

          {/* Author */}
          <div className="flex gap-2 items-center">
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <img
                className="w-full h-full rounded-full object-cover"
                src={
                  post.author?.image
                    ? getImageUrl(post.author.image)
                    : "https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
                }
                alt={post.author?.name || "User"}
              />
            </div>

            <span className="font-Roboto text-xs">
              {post.author?.name || "Unknown User"}
            </span>
          </div>

          <div className="flex gap-1 items-center">
            <span className="font-medium text-xs font-Roboto text-orange-600">
              Read more
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCardTwo;
