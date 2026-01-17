import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Categories from "./Categories";
import AllPosts from "./AllPosts";
import PopularPost from "./PopularPost";
import TopPosts from "./TopPosts";
import FeaturedPosts from "./FeaturedPosts";
import RecommendedPost from "./RecommendedPost";
import TrendingPost from "./TrendingPost";
import RecentPost from "./RecentPost";
import HeroSection from "../components/HeroSection";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux Toolkit/Store";
import { setQuery, clearResults } from "../Redux Toolkit/slice/SearchSlice";

const Homepage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setQuery(""));
    dispatch(clearResults());
  }, [dispatch]);

  return (
    <>
      <Categories />
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
