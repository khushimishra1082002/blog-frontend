import React, { useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";
import { getPopularPostData } from "../services/PostServices";
import conf from "../config/Conf";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { getImageUrl } from "../utils/getImageUrls";

const PopularPost = () => {
  const [popularPosts, setPopularPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getPopularPostData();
        setPopularPosts(res);
      } catch (err: any) {
        setError(
          err?.response?.data?.message || "Failed to load popular posts",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPopularPosts();
  }, []);

  if (loading) return <Loader />;

  if (error) {
    return <Error message={error} />;
  }

  if (!popularPosts || popularPosts.length === 0) {
    return (
      <p className="text-center text-gray-500 py-6">No Popular Posts Found!</p>
    );
  }

  return (
    <div className="bg-white p-5 space-y-4">
      <h1 className="text-xl font-semibold font-Roboto">Popular Posts</h1>

      <div className="bg-gray-100 p-4">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={8}
          slidesPerView={4}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {popularPosts.map((post) => {
            const formattedDate = new Date(post.createdAt).toLocaleDateString(
              "en-GB",
              { day: "numeric", month: "long", year: "numeric" },
            );

            return (
              <SwiperSlide key={post._id} className="bg-white p-4 shadow-lg">
                <Link to={`/singleBlogPage/${post._id}`} className="space-y-4">
                  <span className="text-sm text-gray-800">{formattedDate}</span>

                  <img
                    className="w-full h-60 object-cover rounded shadow hover:scale-105 duration-300"
                    src={getImageUrl(post.image)}
                    alt={post?.title}
                  />

                  <h2 className="font-Roboto text-base hover:underline line-clamp-2">
                    {post?.title}
                  </h2>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default PopularPost;
