import React from "react";
import Categories from "./Categories";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux Toolkit/Store";
import PostCardFive from "../components/PostCardFive";
import { Link } from "react-router-dom";

const SearchResults = () => {
  const query = useSelector((state: RootState) => state.search.query);
  const results = useSelector((state: RootState) => state.search.results);
  console.log("results", results);

  return (
    <>
    
      <div>
        {query.trim() === "" ? (
          <div className="h-96 flex justify-center items-center bg-white w-full">
            <p className="font-Poppins text-xl">Please enter a search term.</p>
          </div>
        ) : results.length === 0 ? (
          <div className="h-96 flex justify-center items-center bg-white w-full">
            No posts found for "{query}".
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
       gap-2 bg-gray-100 p-5"
          >
            {results.map((post, index) => (
              <Link to={`singleBlogPage/${post._id}`}>
                <PostCardFive key={post._id} post={post} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchResults;
