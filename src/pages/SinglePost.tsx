import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { FaThumbsUp } from "react-icons/fa6";
import { LuMessageCircleMore } from "react-icons/lu";
import SimilorPost from "./SimilorPost";
import { useParams } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import Comment from "../pages/Comment";
import conf from "../config/Conf";
import { getSinglePostData } from "../services/PostServices";

const SinglePost = () => {
   const { id } = useParams() as { id: string };

  console.log("id", id);

  const [singlePosts, setSinglePosts] = useState<any>(null);

  useEffect(() => {
    const fetchSinglePosts = async () => {
      try {
        const data = await getSinglePostData(id); 
        setSinglePosts(data);
      } catch (error) {
        console.log("Error fetching single post:", error);
      }
    };
    fetchSinglePosts();
  }, [id]);
  

  return (
    <>
      

      <div className=" grid grid-cols-1 md:grid-cols-2 gap-8 p-5 place-content-center py-7">
        <div className="w-full h-full overflow-hidden">
          <img
            className="w-full h-full shadow-lg object-cover
                        transition-transform duration-300 ease-in-out hover:scale-110 rounded"
            src={
              singlePosts?.image
                ? `${conf.BaseURL}${conf.ImageUploadUrl}/${singlePosts.image}`
                : ""
            }
            alt={singlePosts?.title}
          />
        </div>
        <div className=" space-y-5 py-3">
          <h2 className="font-Inter text-2xl font-medium">
            {singlePosts?.title}
          </h2>
          <div className="space-x-2">
            <span
              className=" text-base text-gray-500 font-Roboto font-medium
                "
            >
              March 20 2025
            </span>
          </div>
          <p className="font-Inter font-light text-sm">
            {singlePosts?.content}
          </p>
          <div className=" flex justify-between">
            <div className=" flex gap-2 items-center">
              <div className=" w-10 h-10 rounded-full">
              <img
                        className="w-full h-full shadow-lg object-cover
                        transition-transform duration-300 ease-in-out hover:scale-110 rounded"
                         src={
                          singlePosts?.author.image
                            ? `${conf.BaseURL}${conf.ImageUploadUrl}/${singlePosts?.author.image}`
                            : ""
                        }
                        alt={singlePosts?.author.title}
                      />
              </div>
              <div className=" flex flex-col">
                <h4 className=" font-RobotoFlex text-base font-medium">
                  {singlePosts?.author.name}
                </h4>
                <span
                  className=" font-OpenSans text-[12px] font-medium text-cyan-500
          "
                >
                  {singlePosts?.author.email}
                </span>
              </div>
            </div>
            <div className=" flex gap-4 justify-end">
              <div className=" flex items-center gap-1 text-gray-500 text-[14px]">
                <FaThumbsUp />
                <span>{singlePosts?.likes.length}</span>
              </div>
              <div className=" flex items-center gap-1 text-gray-500 text-[14px]">
                <LuMessageCircleMore />
                <span>{singlePosts?.comments.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Comment postId={id} singlePosts={singlePosts} />
      <SimilorPost id={id} />
    </>
  );
};

export default SinglePost;
