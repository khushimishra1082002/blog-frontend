import React from "react";
import Categories from "./Categories";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux Toolkit/Store";
import PostCardFive from "../components/PostCardOne";
import { Link } from "react-router-dom";
import PostCardOne from "../components/PostCardOne";

const SearchResults = () => {
  const query = useSelector((state: RootState) => state.search.query);
  const results = useSelector((state: RootState) => state.search.results);

  return (
    <div>
      {results.length === 0 ? (
        <div className="h-96 flex justify-center items-center bg-white w-full">
          <p>No posts found</p>
        </div>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
          gap-2 bg-gray-100 p-5"
        >
          {results.map((post) => (
            <Link key={post._id} to={`singleBlogPage/${post._id}`}>
              <PostCardOne post={post} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;

