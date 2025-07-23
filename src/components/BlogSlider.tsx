import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const BlogSlider = () => {
  return (
    <>
      <div className="bg-white p-5 space-y-4 ">
        <h1 className=" text-2xl font-semibold font-Roboto ">Recent Aricles</h1>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={3}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          className=" bg-gray-100 "
        >
          <SwiperSlide className=" bg-white p-4   border border-black/15
          rounded-md">
            <div>
              <img
                className=" w-full h-52 shadow rounded-md"
                src="https://cdn.careerfoundry.com/en/wp-content/uploads/2021/06/startup_programmers_office.webp?x47357"
              />
              <div className=" flex flex-col gap-1 col-span-2 py-2 p-2">
                <span className="text-cyan-600 text-base font-Roboto">
                  Web Development
                </span>
                <h2 className="font-Roboto text-lg">
                  7 Best Data Warehouse Tools to Explore in 2025
                </h2>
                <div className="space-x-2">
                  <span
                    className=" text-base text-gray-500 font-Roboto font-medium
                "
                  >
                    March 20 2025
                  </span>
                  <span className="text-gray-400 font-Inter text-sm">
                    10 Minutes Read
                  </span>
                </div>
                <p className="font-Inter font-light text-sm">
                  There are more online learning platforms available than ever.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className=" bg-white p-4   border border-black/15
          rounded-md">
            <div>
              <img
                className=" w-full h-52 shadow-lg rounded-md"
                src="https://cdn.careerfoundry.com/en/wp-content/uploads/2021/01/ui-courses-2020-cover-image.webp?x47357"
              />
              <div className=" flex flex-col gap-1 col-span-2 py-2">
                <span className="text-cyan-600 text-base font-Roboto">
                  UI Design
                </span>
                <h2 className="font-Roboto text-lg">
                  These Are The 9 Best UI Design Courses in 2025
                </h2>
                <div className="space-x-2">
                  <span
                    className=" text-base text-gray-500 font-Roboto font-medium
                "
                  >
                    March 20 2025
                  </span>
                  <span className="text-gray-400 font-Inter text-sm">
                    10 Minutes Read
                  </span>
                </div>
                <p className="font-Inter font-light text-sm">
                  There are more online learning platforms available than ever.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className=" bg-white p-4   border border-black/15
          rounded-md">
            <div>
              <img
                className=" w-full h-52 shadow-lg rounded-md"
                src="https://cdn.careerfoundry.com/en/wp-content/uploads/2021/03/Types_of_data_viz.webp?x47357"
              />
              <div className=" flex flex-col gap-1 col-span-2 py-2">
                <span className="text-cyan-600 text-base font-Roboto">
                  Web Development
                </span>
                <h2 className="font-Roboto text-lg">
                  7 Best Data Warehouse Tools to Explore in 2025
                </h2>
                <div className="space-x-2">
                  <span
                    className=" text-base text-gray-500 font-Roboto font-medium
                "
                  >
                    March 20 2025
                  </span>
                  <span className="text-gray-400 font-Inter text-sm">
                    10 Minutes Read
                  </span>
                </div>
                <p className="font-Inter font-light text-sm">
                  There are more online learning platforms available than ever.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className=" bg-white p-4   border border-black/15
          rounded-md">
            <div>
              <img
                className=" w-full h-52 shadow-lg rounded-md"
                src="https://cdn.careerfoundry.com/en/wp-content/uploads/2021/01/blog-1.webp?x47357"
              />
              <div className=" flex flex-col gap-1 col-span-2 py-2">
                <span className="text-cyan-600 text-base font-Roboto">
                  Web Development
                </span>
                <h2 className="font-Roboto text-lg">
                  7 Best Data Warehouse Tools to Explore in 2025
                </h2>
                <div className="space-x-2">
                  <span
                    className=" text-base text-gray-500 font-Roboto font-medium
                "
                  >
                    March 20 2025
                  </span>
                  <span className="text-gray-400 font-Inter text-sm">
                    10 Minutes Read
                  </span>
                </div>
                <p className="font-Inter font-light text-sm">
                  There are more online learning platforms available than ever.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className=" bg-white p-4   border border-black/15
          rounded-md">
            <div>
              <img
                className=" w-full h-52 shadow-lg rounded-md"
                src="https://cdn.careerfoundry.com/en/wp-content/uploads/2021/07/UX-design-course.webp?x47357"
              />
              <div className=" flex flex-col gap-1 col-span-2 py-2">
                <span className="text-cyan-600 text-base font-Roboto">
                  Web Development
                </span>
                <h2 className="font-Roboto text-lg">
                  7 Best Data Warehouse Tools to Explore in 2025
                </h2>
                <div className="space-x-2">
                  <span
                    className=" text-base text-gray-500 font-Roboto font-medium
                "
                  >
                    March 20 2025
                  </span>
                  <span className="text-gray-400 font-Inter text-sm">
                    10 Minutes Read
                  </span>
                </div>
                <p className="font-Inter font-light text-sm">
                  There are more online learning platforms available than ever.
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default BlogSlider;
