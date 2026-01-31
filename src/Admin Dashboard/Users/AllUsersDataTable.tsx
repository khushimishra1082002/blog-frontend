import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AiOutlineSearch } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../Redux Toolkit/Store";
import { fetchAllUsers } from "../../Redux Toolkit/slice/UserSlice";
import axios from "axios";
import { deleteUserData } from "../../services/UserServices";
import { searchUserData } from "../../services/SearchDataService";
import { getImageUrl } from "../../utils/getImageUrls";
import { TableColumn } from "react-data-table-component";

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  image: string;
}

const AllUsersDataTable = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState<User[]>([]);
  console.log("searchResult", searchResult);

  useEffect(() => {
    if (query.trim() === "") {
      setSearchResult([]);
      return;
    }

    const fetchSearchUsers = async () => {
      try {
        const res = await searchUserData(query);
        setSearchResult(res);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchUsers();
  }, [query]);

  const { users, loading, error } = useSelector(
    (state: RootState) => state.usersData,
  );
  console.log(users);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUserData(userId);
      alert("User deleted successfully!");
      dispatch(fetchAllUsers());
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "An error occurred while deleting the user.",
      );
    }
  };

  const columns: TableColumn<User>[] = [
    {
      name: "Image",
      selector: (row: User) => row.image,
      cell: (row: User) => (
        <img
          src={
            row.image
              ? getImageUrl(row?.image)
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF02Jj8T2t7PdkytAw42HDuuSz7yXguKn8Lg&s"
          }
          alt={row.name}
          className="w-8 object-cover rounded-md"
        />
      ),
      width: "140px",
    },

    {
      name: "Name",
      selector: (row: User) => row.name,
      sortable: true,
      width: "180px",
    },

    {
      name: "Email",
      selector: (row: User) => row.email,
      sortable: true,
      width: "290px",
    },

    {
      name: "Role",
      cell: (row: User) => <div className="capitalize">{row.role}</div>,
      sortable: true,
      width: "170px",
    },

    {
      name: "Actions",
      cell: (row: User) => (
        <div className="flex gap-2">
          <Link
            to={`/dashboard/editUser/${row._id}`}
            className="bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-800 text-sm"
          >
            <FaEdit />
          </Link>
          <button
            className="bg-red-500 text-white px-2 py-2 rounded hover:bg-red-800 text-[12px]"
            onClick={() => handleDeleteUser(row._id)}
          >
            <FaTrash />
          </button>
        </div>
      ),
      width: "60px",
      ignoreRowClick: true,
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
        <h2 className="text-lg font-medium font-RobotoFlex">All Users</h2>
        <div className="flex items-center gap-4 h-10 w-full mb-4">
          <div className="relative flex-grow">
            <input
              className="border border-gray-300 rounded-md font-RobotoFlex w-full pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-500 transition"
              type="text"
              placeholder="Search user..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <AiOutlineSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 text-lg" />
          </div>

          <Link
            to="/dashboard/addNewUser"
            className="bg-orange-600 text-white rounded px-4
                       py-2 font-medium flex items-center gap-1 shadow-md hover:bg-orange-700
                        hover:scale-105 transition font-Poppins text-[15px]"
          >
            <FaPlus />
            Add User
          </Link>
        </div>
        <DataTable
          columns={columns}
          data={query.trim() ? searchResult : users}
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

export default AllUsersDataTable;
