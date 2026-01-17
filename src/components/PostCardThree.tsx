import React from "react";
import { LuFileSpreadsheet } from "react-icons/lu";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa6";
import { LuMessageCircleMore } from "react-icons/lu";
import conf from "../config/Conf";
import { getImageUrl } from "../utils/getImageUrls";

const PostCardThree = ({ post }) => {
  return (
    <>
      <div
        className=" grid grid-cols-1 md:grid-cols-2 gap-5 shadow bg-white   p-5
       border border-black/5"
      >
        <div className="w-full h-56 overflow-hidden">
          <img
            className="w-full h-full shadow-lg object-cover
                        transition-transform duration-300 ease-in-out hover:scale-110 rounded"
            src={getImageUrl(post.image)}
            alt={post.title}
          />
        </div>
        <div className=" flex flex-col gap-3">
          <span className=" text-cyan-500 font-semibold text-[12px] font-Inter tracking-wider">
            {post.category?.name}
          </span>
          <h3 className=" text-base font-RobotoFlex hover:underline">
            {post.title}
          </h3>
          <span className=" font-Roboto text-gray-400 font-mdium text-sm">
            April 22 , 2025
          </span>
          <p className=" text-[11px]  font-Inter font-light line-clamp-4">
            {post.content}
          </p>
          <div className=" grid grid-cols-2 justify-between ">
            <div className="flex gap-2 items-center">
              <div className="w-6 h-6 rounded-full">
                <img
                  className=" w-full h-full rounded-full"
                  src={
                    post.author.image
                      ? getImageUrl(post.author.image)
                      : "https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
                  }
                />
              </div>
              <span className=" font-Roboto text-sm ">{post.author?.name}</span>
            </div>

            <div></div>
          </div>
          <div className=" flex gap-1 items-center ">
            <span className=" font-medium text-xs font-Roboto text-orange-600">
              Read more
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCardThree;
