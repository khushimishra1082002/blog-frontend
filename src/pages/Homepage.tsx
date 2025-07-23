import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Categories from "./Categories";
import AllPosts from "./AllPosts";
import PopularPost from "./PopularPost";
import TopPosts from "./TopPosts";
import FeaturedPosts from "./FeaturedPosts";
import RecommendedPost from "./RecommendedPost";
import TrendingPost from "./TrendingPost";
import SimilorPost from "./SimilorPost";
import RecentPost from "./RecentPost";
import HeroSection from "../components/HeroSection";
import { IoLogoFacebook } from "react-icons/io";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";
import { FaYoutubeSquare } from "react-icons/fa";
import SocialIcon from "../components/SocialIcon";
import { getDecodedToken } from "../utils/tokenUtils";

const Homepage = () => {
  
  return (
    <>
      <div className="">
        <Categories />
      </div>
      <HeroSection />
      <AllPosts />
      <PopularPost />
      <FeaturedPosts />
      <TopPosts />
      <RecommendedPost />
      <TrendingPost />
      <RecentPost />
      <Footer />
    </>
  );
};

export default Homepage;
