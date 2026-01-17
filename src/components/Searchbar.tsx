import React, { useEffect, ChangeEvent, KeyboardEvent } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../Redux Toolkit/Store";
import {
  setQuery,
  clearResults,
  searchPosts,
} from "../Redux Toolkit/slice/SearchSlice";
import { fetchAllPosts } from "../Redux Toolkit/slice/PostSlice";

const Searchbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const query = useSelector((state: RootState) => state.search.query);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value));
  };

  const handleNavigation = () => {
    navigate("/searchResults");
  };

  useEffect(() => {
    if (!query.trim()) {
      dispatch(clearResults());
      dispatch(fetchAllPosts());
    } else {
      dispatch(searchPosts(query));
    }
  }, [query, dispatch]);

  return (
    <div className="flex justify-center items-center">
      <div className="relative w-[40vw]">
        <input
          type="text"
          placeholder="Find a post you're looking for..."
          value={query}
          onChange={handleSearchChange}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              handleNavigation();
            }
          }}
          className="w-full border border-black/15
          pl-12 pr-4 py-2 text-sm focus:outline-none focus:ring-1
          focus:ring-orange-500 transition-all duration-300 rounded-l-sm"
        />

        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
      </div>

      <button
        onClick={handleNavigation}
        className="bg-cyan-500 flex items-center gap-1 text-white py-2 px-2 text-[15px]
        rounded-r-sm font-semibold font-Inter"
      >
        <Search size={18} />
        Search
      </button>
    </div>
  );
};

export default Searchbar;
