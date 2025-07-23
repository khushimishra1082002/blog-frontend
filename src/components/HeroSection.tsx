import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative h-[85vh] w-full overflow-hidden">
      
      <img
        className="w-full h-full object-cover shadow-2xl"
        src="https://cdn.dribbble.com/userupload/2671369/file/original-06aa35da941aa765dd98136c8e8e0654.png?resize=2048x1536&vertical=center"
        alt="Hero"
      />

      
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <div className="text-center text-white px-4 space-y-5">
          <h1 className="text-4xl md:text-5xl font-Inter font-bold">
            Welcome to Our Blog
          </h1>
          <p className="text-sm font-Poppins w-11/12 md:w-6/12 m-auto ">
            Discover articles, insights, and stories that inspire.From the
            latest trends in technology and lifestyle to deep dives into
            creative journeys — explore thoughtful content curated just for you.
           
          </p>

         <div>

          <Link to="allPosts" >
          <button className="px-6 py-3 bg-white text-black
            font-semibold rounded-md hover:bg-gray-200 transition font-Roboto">
            Explore Posts
          </button>
          </Link>
         </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
