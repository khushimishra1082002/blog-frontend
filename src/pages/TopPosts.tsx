import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import conf from "../config/Conf";
import { getTopPostData } from "../services/PostServices";
import Loader from "../components/Loader";
import Error from "../components/Error";

const TopPosts = () => {
  const [topPost, setTopPost] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getTopPostData();
        setTopPost(res);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load top posts");
      } finally {
        setLoading(false);
      }
    };

    fetchTopPosts();
  }, []);

  if (loading) return <Loader />;

  if (error) {
    return <Error message={error} />;
  }

  if (!topPost || topPost.length === 0) {
    return <p className="text-center text-gray-500 py-8">No Top Posts Found</p>;
  }

  return (
    <div className="bg-gray-100 p-5 space-y-4">
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
              <Link to={`/singleBlogPage/${item._id}`}>
                <div
                  className="border border-black/10 rounded
                  shadow-lg hover:shadow-xl p-5 space-y-6 h-96"
                >
                  <div className="flex gap-2 items-center">
                    <div className="w-6 h-6 rounded-full">
                      <img
                        className="w-full h-full rounded-full"
                        src={
                          item.author?.image
                            ? `${conf.BaseURL}${conf.ImageUploadUrl}/${item.author.image}`
                            : ""
                        }
                        alt={item.author?.name}
                      />
                    </div>

                    <span className="font-Roboto text-sm">
                      {item.author?.name}
                    </span>
                  </div>

                  <h4 className="font-Inter text-sm font-medium line-clamp-2 hover:underline">
                    {item.title}
                  </h4>

                  <img
                    className="w-full h-52 object-cover"
                    src={
                      item?.image
                        ? `${conf.BaseURL}${conf.ImageUploadUrl}/${item.image}`
                        : ""
                    }
                    alt={item.title}
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
