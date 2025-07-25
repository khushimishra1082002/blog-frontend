import React, { useState, useEffect } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import axios from "axios";
import { Link } from "react-router-dom";
import conf from "../config/Conf";
import { getTreandingPostData } from "../services/PostServices";

const TrendingPost = () => {
  const [trendingPosts, setTrendingPosts] = useState<any>([]);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        const res = await getTreandingPostData()
        setTrendingPosts(res);
      } catch (error) {
        console.log("Error fetching trending posts:", error);
      }
    };

    fetchTrendingPosts();
  }, []);

  return (
    <div className="bg-white p-5 space-y-4">
      <h1 className="text-xl font-semibold font-Roboto">Trending Posts</h1>
      <div className="bg-gray-100 p-5">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={3}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {trendingPosts.map((post, index) => (
            <SwiperSlide key={index} className="bg-white p-4 shadow">
            <Link to = {`singleBlogPage/${post._id}`}>
            <div className="space-y-2">
            <div className="w-full h-56 overflow-hidden">
                      <img
                        className="w-full h-full shadow-lg object-cover
                        transition-transform duration-300 ease-in-out hover:scale-110 rounded"
                         src={
                          post.image
                            ? `${conf.BaseURL}${conf.ImageUploadUrl}/${post.image}`
                            : ""
                        }
                        alt={post.title}
                      />
                    </div>
                <div className="space-y-2">
                  <span className="text-sm text-gray-700 font-Roboto font-medium">
                    {new Date(post.createdAt).toDateString()}
                  </span>
                  <h2 className="text-base font-Inter font-medium hover:underline">
                    {post.title}
                  </h2>
                  <p className=" font-Inter font-light text-[12px]  line-clamp-3">
                    {post.content}
                  </p>
                </div>
              </div></Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TrendingPost;
