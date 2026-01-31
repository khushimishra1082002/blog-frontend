import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AiOutlineSearch } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../Redux Toolkit/Store";
import { fetchAllCategory } from "../../Redux Toolkit/slice/CategorySlice";
import { deleteCategoryData } from "../../services/CategoryService";
import { searchCategoryData } from "../../services/SearchDataService";
import type { TableColumn } from "react-data-table-component";

interface Category {
  _id: string;
  name: string;
}

const AllCategoryDataTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState<Category[]>([]);
  console.log("searchResult", searchResult);

  useEffect(() => {
    if (query.trim() === "") {
      setSearchResult([]);
      return;
    }

    const fetchSearchCategory = async () => {
      try {
        const res = await searchCategoryData(query);
        setSearchResult(res);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchCategory();
  }, [query]);

  const { category, loading, error } = useSelector(
    (state: RootState) => state.categoryData,
  );
  console.log(category);

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  const handleDeletePost = async (categoryId: string) => {
    try {
      await deleteCategoryData(categoryId);
      alert("Category deleted successfully!");
      dispatch(fetchAllCategory());
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "An error occurred while deleting the post.",
      );
    }
  };

  const columns: TableColumn<Category>[] = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      grow: 2,
      width: "180px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <Link
            to={`/dashboard/editCategory/${row._id}`}
            className="bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-800 text-sm"
          >
            <FaEdit />
          </Link>
          <button
            className="bg-red-500 text-white px-2 py-2 rounded hover:bg-red-800 text-[12px]"
            onClick={() => handleDeletePost(row._id)}
          >
            <FaTrash />
          </button>
        </div>
      ),
      width: "60px",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  // Custom Table Styles
  const customStyles = {
    rows: { style: { minHeight: "60px", fontFamily: "Inter, sans-serif" } },
    headCells: {
      style: {
        fontWeight: "600",
        fontSize: "14px",
        paddingLeft: "8px",
        fontFamily: "Inter, serif",
      },
    },
    cells: {
      style: {
        fontSize: "13px",
        paddingLeft: "10px",
        fontFamily: "Inter, sans-serif",
      },
    },
  };
  return (
    <>
      <div className=" space-y-4">
        <h2 className="text-lg font-medium font-RobotoFlex">All Category</h2>
        <div className="flex items-center gap-4 h-10 w-full mb-4">
          <div className="relative flex-grow">
            <input
              className="border border-gray-300 rounded-md font-RobotoFlex w-full pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-500 transition"
              type="text"
              placeholder="Search Category..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <AiOutlineSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 text-lg" />
          </div>

          <Link
            to="/dashboard/addNewCategory"
            className="bg-orange-600 text-white rounded px-4
            py-2 font-medium flex items-center gap-1 shadow-md hover:bg-orange-700
            hover:scale-105 transition font-Poppins text-[15px]"
          >
            <FaPlus />
            Add Category
          </Link>
        </div>
        <DataTable
          columns={columns}
          data={query.trim() ? searchResult : category}
          fixedHeaderScrollHeight="300px"
          pagination
          responsive
          subHeaderWrap
          customStyles={customStyles}
        />
      </div>
    </>
  );
};

export default AllCategoryDataTable;
