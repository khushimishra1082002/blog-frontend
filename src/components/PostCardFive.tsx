import React from "react";
import { FaThumbsUp } from "react-icons/fa6";
import { LuMessageCircleMore } from "react-icons/lu";

const PostCardFive = ({ post }) => {
  return (
    <div className="bg-white p-4 shadow-lg rounded space-y-3 ">
      <div className="w-full h-56 overflow-hidden">
        <img
          className="w-full h-full shadow-lg object-cover
                        transition-transform duration-300 ease-in-out hover:scale-110 rounded"
          src={post.image ? `http://localhost:5000/uploads/${post.image}` : ""}
          alt={post.title}
        />
      </div>

      <div className="space-y-4">
        <span className="font-Roboto text-gray-600 text-sm">
          {new Date(post.createdAt).toDateString()}
        </span>

        <h2 className="text-base font-Inter font-medium hover:underline line-clamp-2">
          {post.title}
        </h2>

        <p className="font-Inter text-[12px] font-light line-clamp-3">
          {post.content}
        </p>

        <div className="grid grid-cols-2 justify-between pt-2">
          <div className="flex gap-2 items-center">
          <div className="flex gap-2 items-center">
                 
                 <div className="w-6 h-6 rounded-full">
                       <img
                         className=" w-full h-full rounded-full"
                         src={
                           post.author.image
                             ? `http://localhost:5000/uploads/${post.author.image}`
                             : ""
                         }
                       />
                     </div>
               
                 <span className="font-Roboto text-sm">
                   {post.author?.name}
                 </span>
               </div>

          </div>

    
        </div>
      </div>
    </div>
  );
};

export default PostCardFive;
