import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchResults from "../pages/SearchResults";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../Redux Toolkit/Store";
import { setQuery,setResults } from "../Redux Toolkit/slice/SearchSlice";

interface Post {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  image: string;
  author: {
    _id: string;
    name: string;
    image?: string;
  };
  published: boolean;
  createdAt: string;
  likes?: string[];
  views?: number;
  comments: string;
}

const Searchbar = () => {
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.search.query);

  const handleSearch = (value: string) => {
    dispatch(setQuery(value));
  };

  useEffect(() => {
    if (query.trim() === "") {
      dispatch(setResults([]));
      return;
    }

    const fetchSearch = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/search/searchPost?q=${query}`
        );
        dispatch(setResults(res.data));
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearch();
  }, [query]);
  const navigate = useNavigate();

  const hanldenavigation = () => {
    if (query.trim() !== "") {
      navigate("/searchResults");
      
    }
  };
  
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="relative w-[40vw]">
          <input
            type="text"
            placeholder="Find a post you're looking for..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full border border-black/15
           pl-12 pr-4 py-2 text-sm focus:outline-none focus:ring-1
            focus:ring-orange-500 transition-all duration-300 rounded-l-sm"
          />
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
        <div>
          <button
            onClick={hanldenavigation}
            className="bg-cyan-500 flex items-center gap-1 text-white py-2 px-2 text-[15px]
             rounded-r-sm font-semibold font-Inter"
          >
            <Search className=" text-white" size={18} />
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default Searchbar;

