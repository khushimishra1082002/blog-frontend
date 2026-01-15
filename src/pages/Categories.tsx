import React, { useEffect } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../Redux Toolkit/Store";
import { fetchAllCategory } from "../Redux Toolkit/slice/CategorySlice";
import { filteredPostDataByCategory } from "../Redux Toolkit/slice/PostSlice";
import Loader from "../components/Loader";
import Error from "../components/Error";

const Categories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { category, loading, error } = useSelector(
    (state: RootState) => state.categoryData
  );

  console.log("v",category);
  

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  if (loading) return <Loader />;

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="bg-white p-4 border border-b border-black/10 shadow-md">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={2}
        slidesPerView={9}
        loop
        breakpoints={{
          320: { slidesPerView: 4, spaceBetween: 6 },
          420: { slidesPerView: 4, spaceBetween: 6 },
          620: { slidesPerView: 5, spaceBetween: 6 },
          900: { slidesPerView: 7, spaceBetween: 6 },
          1000: { slidesPerView: 9, spaceBetween: 6 },
          1200: { slidesPerView: 9, spaceBetween: 6 },
        }}
      >
        {category.map((value, index) => (
          <SwiperSlide
            key={value._id || index}
            className="flex flex-col justify-center items-center"
          >
            <Link
              to="/CategoryResults"
              className="flex flex-col justify-center items-center"
              onClick={() => {
                dispatch(filteredPostDataByCategory(value.name));
                navigate("/CategoryResults");
              }}
            >
              <span
                className="cursor-pointer text-center tracking-wide 
                text-[11px] md:text-sm font-Poppins font-medium
                hover:text-orange-500 transition-all duration-300"
              >
                {value.name}
              </span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Categories;
