import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import conf from "../config/Conf";
import { getTopPostData } from "../services/PostServices";

const TopPosts = () => {
  const [topPost, setTopPost] = useState<any>([]);

  useEffect(() => {
    const fetchTopPosts = async () => {
      try {
       const res  = await getTopPostData()
        setTopPost(res);
      } catch (error) {
        console.log("Error fetching top posts:", error);
      }
    };
    fetchTopPosts();
  }, []);

  return (
    <div className="bg-gry-100 p-5 space-y-4">
      <h1 className="text-xl font-semibold font-Roboto">Top Posts</h1>

      <div className="relative h-96 p-4 bg-gray-50">
        <Swiper
          className="h-full"
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={10}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 4 },
          }}
        >
          {topPost.map((item) => (
            <SwiperSlide key={item._id} className="h-full bg-white">
              <Link to={`singleBlogPage/${item._id}`}>
                <div
                  className=" border border-black/10 rounded
               shadow-lg hover:shadow-xl p-5 space-y-6 h-96"
                >
                  <div className="flex gap-2 items-center">
                 
                    <div className="w-6 h-6 rounded-full">
                          <img
                            className=" w-full h-full rounded-full"
                            src={
                              item.author.image
                                ? `${conf.BaseURL}${conf.ImageUploadUrl}/${item.author.image}`
                                : ""
                            }
                          />
                        </div>
                  
                    <span className="font-Roboto text-sm">
                      {item.author?.name}
                    </span>
                  </div>

                  <h4
                    className="font-Inter text-sm font-medium line-clamp-2
                hover:underline"
                  >
                    {item.title}
                  </h4>

                  <img
                    className="w-full h-52  object-cover
                   transition-transform  ease-in-out "
                    src={
                      item?.image
                        ? `${conf.BaseURL}${conf.ImageUploadUrl}/${item.image}`
                        : ""
                    }
                  />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPosts;
