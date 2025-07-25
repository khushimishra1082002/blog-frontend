import React, { useState,useEffect } from "react";
import axios from "axios"
import { Link } from "react-router-dom";
import conf from "../config/Conf";
import { getFeaturedPostData } from "../services/PostServices";

const FeaturedPosts = () => {
  const [featuredPost,setFeaturedPost] = useState<any>([])


   useEffect(() => {
      const fetchPopularPosts = async () => {
        try { 
          const res = await getFeaturedPostData()
          
          setFeaturedPost(res);
        } catch (error) {
          console.log("Error fetching featured posts:", error);
        }
      };
  
      fetchPopularPosts();
    }, []);

  return (
    <>
     <div className="bg-white p-5 space-y-4">
  <h1 className=" text-xl font-semibold font-Roboto">Featured Posts</h1>

  <div className=" grid grid-cols-1 md:grid-cols-2 gap-3 min-h-[70vh]">

    {/* Big Post */}
    {featuredPost[0] && (
      <Link to = {`singleBlogPage/${featuredPost[0]._id}`} className="relative
       bg-gradient-to-t from-black/80 to-black/80">
        <img
                      className="w-full h-full object-cover
                        transition-transform duration-300 ease-in-out mix-blend-overlay"
                      src={
                        featuredPost[0]?.image
                          ? `${conf.BaseURL}${conf.ImageUploadUrl}/${featuredPost[0].image}`
                          : ""
                      }
                     
                    />
        <div className="absolute bottom-3 text-white p-3">
          <h4 className="text-lg font-RobotoFlex">{featuredPost[0].title}</h4>
          <p className="font-Inter text-[12px] text-white/90 font-light line-clamp-3">
            {featuredPost[0].content}
          </p>
        </div>
      </Link>
    )}

    {/* Small Posts */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-full">
      {featuredPost.slice(1).map((post) => (
        <Link to = {`singleBlogPage/${post._id}`} key={post._id} className="relative bg-gradient-to-t from-black/70 to-black/70
        ">
           <img
                      className="w-full h-full object-cover
                        transition-transform duration-300 ease-in-out mix-blend-overlay"
                      src={
                        post?.image
                          ? `${conf.BaseURL}${conf.ImageUploadUrl}/${post.image}`
                          : ""
                      }
                     
                    />
          <div className="absolute bottom-2 text-white p-2">
            <h4 className="text-[13px] font-RobotoFlex font-medium line-clamp-1">{post.title}</h4>
            <p className="font-Inter text-[12px] text-white/90 font-light line-clamp-1">
            {post.content}
          </p>
          </div>
        </Link>
      ))}
    </div>

  </div>
</div>

    </>
  );
};

export default FeaturedPosts;
