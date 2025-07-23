import React, { useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa6";
import { LuMessageCircleMore } from "react-icons/lu";
import axios from "axios";
import { Link } from "react-router-dom";

const PopularPost = () => {
  const [popularPosts, setPopularPosts] = useState<any>([]);

  console.log("popularPosts", popularPosts);

  useEffect(() => {
    const fetchPopularPosts = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/blog-posts/popular-posts"
        );
        console.log(data);

        setPopularPosts(data);
      } catch (error) {
        console.log("Error fetching popular posts:", error);
      }
    };

    fetchPopularPosts();
  }, []);

  return (
    <>
      <div className="bg-white p-5 space-y-4 ">
        <h1 className="text-xl font-semibold font-Roboto">Popular Posts</h1>
        <div className="bg-gray-100 p-4">
          {popularPosts.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={8}
              slidesPerView={4}
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
              className="bg-gray-100"
            >
              {popularPosts.map((post) => {
                const formattedDate = new Date(
                  post.createdAt
                ).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                });

                return (
                  <SwiperSlide
                    key={post._id}
                    className="bg-white p-4 shadow-lg"
                  >
                    <Link
                      className="space-y-4"
                      to={`singleBlogPage/${post._id}`}
                    >
                      <span className="text-sm text-gray-800">
                        {formattedDate}
                      </span>
                      <img
                        className="w-full h-60 object-cover
                         transition-transform duration-300 ease-in-out rounded shadow"
                        src={
                          post?.image
                            ? `http://localhost:5000/uploads/${post.image}`
                            : ""
                        }
                        alt={post?.title}
                      />
                      <div className="flex flex-col gap-1 col-span-2 py-2 p-2">
                        <h2 className="font-Roboto text-base hover:underline line-clamp-2">
                          {post?.title}
                        </h2>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            <p>No Popular Posts Found!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default PopularPost;
