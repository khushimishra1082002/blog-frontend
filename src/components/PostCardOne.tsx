import React from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa6";
import { LuMessageCircleMore } from "react-icons/lu";
import { LuFileSpreadsheet } from "react-icons/lu";

const PostCardOne = () => {
  return (
    <>
      <div
        className="shadow-lg bg-white rounded-md flex flex-col gap-4 p-5
       border border-black/10 "
      >
        <h4 className=" text-2xl font-Roboto ont-medium hover:underline">
          Top 10 Summer Fashion Trends 2025
        </h4>
        <p className=" font-Inter text-sm font-light">
          Discover the hottest fashion trends this summer! From oversized shirts
          to bold colors, here's everything you need to stay stylish this
          season.
        </p>
        <div className=" flex gap-1 items-center ">
          
          <span className=" font-medium text-sm font-Roboto text-orange-600">
            Read more
          </span>
        </div>
        <img
          className=" w-full h-96 shadow-lg rou"
          src="https://www.99percentlifestyle.com/wp-content/uploads/2016/05/photo-1445053148743-7fdbc0ab0e99-min.jpeg"
        />
        <span className=" font-Roboto text-gray-400 font-mdium text-sm">
          April 22 , 2025
        </span>

        <div className=" grid grid-cols-2 justify-between ">
          <div className="flex gap-2 items-center">
            <div className="w-6 h-6 rounded-full">
              <img
                className=" w-full h-full rounded-full"
                src="https://d2gwgwt9a7yxle.cloudfront.net/what_is_user_id_in_net_banking_mobile_871b681e52.jpg"
              />
            </div>
            <span className=" font-Roboto text-sm ">Rahul Verma</span>
          </div>
          <div className=" flex gap-4 justify-end">
            <div className=" flex items-center gap-1 text-gray-500 text-[14px]">
              <FaThumbsUp />
              <span>34</span>
            </div>
            <div className=" flex items-center gap-1 text-gray-500 text-[14px]">
              <LuMessageCircleMore />
              <span>34</span>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default PostCardOne;
