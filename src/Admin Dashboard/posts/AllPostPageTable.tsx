// AllPostPageTable.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../../Redux Toolkit/slice/PostSlice";
import { RootState, AppDispatch } from "../../Redux Toolkit/Store";
import AllPostDataTable from "./AllPostDataTable";

const AllPostPageTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.postsData);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return <AllPostDataTable />;
};

export default AllPostPageTable;
