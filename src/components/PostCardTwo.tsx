import React from "react";
import conf from "../config/Conf";

const PostCardTwo = ({ post }) => {
  return (
    <>
      <div className=" ">
        <div className=" space-y-3 shadow-md p-3">
          <div className="w-full h-36">
            <img
              className="w-full h-full shadow-lg object-cover
                        transition-transform duration-300 ease-in-out hover:scale-110 rounded"
              src={
                post.image ? `${conf.BaseURL}${conf.ImageUploadUrl}/${post.image}` : ""
              }
              alt={post.title}
            />
          </div>

          <div className=" flex flex-col gap-3">
            <span className=" text-cyan-500 font-semibold text-[12px] font-Inter tracking-wider">
              {post.category?.name}
            </span>
            <h3
              className=" text-base font-RobotoFlex
                    hover:underline line-clamp-1"
            >
              {post.title}
            </h3>
            <p className=" text-[11px]  font-Inter font-light line-clamp-3">
              {post.content}
            </p>
            <div className=" ">
              <div className="flex gap-2 items-center">
                <div className="w-6 h-6 rounded-full">
                  <img
                    className=" w-full h-full rounded-full"
                    src="https://media.licdn.com/dms/image/v2/D5612AQHEghtIOHXERA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1680751641612?e=2147483647&v=beta&t=i0q-_zjr6yU3AGnVSiz83yrZG5wRUmO2aQ8vdug1eCc"
                  />
                </div>
                <span className=" font-Roboto text-xs">
                  {post.author?.name}
                </span>
              </div>
            </div>
            <div className=" flex gap-1 items-center ">
              <span className=" font-medium text-xs font-Roboto text-orange-600">
                Read more
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCardTwo;
