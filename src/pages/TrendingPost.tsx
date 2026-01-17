import React, { useState, useEffect } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";
import conf from "../config/Conf";
import { getTreandingPostData } from "../services/PostServices";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { getImageUrl } from "../utils/getImageUrls";

const TrendingPost = () => {
  const [trendingPosts, setTrendingPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getTreandingPostData();
        setTrendingPosts(res);
      } catch (err: any) {
        setError(
          err?.response?.data?.message || "Failed to load trending posts",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingPosts();
  }, []);

  if (loading) return <Loader />;

  if (error) {
    return <Error message={error} />;
  }

  if (!trendingPosts || trendingPosts.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">No Trending Posts Found</p>
    );
  }

  return (
    <div className="bg-white p-5 space-y-4">
      <h1 className="text-xl font-semibold font-Roboto">Trending Posts</h1>

      <div className="bg-gray-100 p-5">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={3}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {trendingPosts.map((post) => (
            <SwiperSlide key={post._id} className="bg-white p-4 shadow">
              <Link to={`/singleBlogPage/${post._id}`}>
                <div className="space-y-2">
                  <div className="w-full h-56 overflow-hidden">
                    <img
                      className="w-full h-full object-cover hover:scale-110 duration-300 rounded"
                      src={getImageUrl(post.image)}
                      alt={post.title}
                    />
                  </div>

                  <span className="text-sm text-gray-700 font-Roboto font-medium">
                    {new Date(post.createdAt).toDateString()}
                  </span>

                  <h2 className="text-base font-Inter font-medium hover:underline line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="font-Inter font-light text-[12px] line-clamp-3">
                    {post.content}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TrendingPost;
