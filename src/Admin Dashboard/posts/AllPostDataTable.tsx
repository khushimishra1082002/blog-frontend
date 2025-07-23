import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AiOutlineSearch } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../../Redux Toolkit/slice/PostSlice";
import { RootState, AppDispatch } from "../../Redux Toolkit/Store";
import { deletePostData } from "../../services/PostServices";
import { searchPostData } from "../../services/SearchDataService";

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

const AllPostDataTable = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [query, setQuery] = useState("");
  console.log("query", query);

  const [searchResult, setSearchResult] = useState<Post[]>([]);
  console.log("searchResult", searchResult);

  useEffect(() => {
    if (query.trim() === "") {
      setSearchResult([]);
      return;
    }

    const fetchSearchPosts = async () => {
      try {
        const res = await searchPostData(query);
        setSearchResult(res);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchPosts();
  }, [query]);

  const { posts, loading, error } = useSelector(
    (state: RootState) => state.postsData
  );
  console.log(posts);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  const handleDeletePost = async (postId: string) => {
    try {
      await deletePostData(postId);
      alert("Post deleted successfully!");
      dispatch(fetchAllPosts());
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "An error occurred while deleting the post."
      );
    }
  };

  const columns = [
    {
      name: "Image",
      selector: (row) => row.image,
      cell: (row) => (
        <img
          src={
            row.image
              ? `http://localhost:5000/uploads/${row.image}`
              : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
          }
          alt={row.name}
          className="w-10 h-10 object-cover rounded-md"
        />
      ),
      width: "140px",
    },

    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      grow: 2,
      width: "150px",
    },
    {
      name: "Content",
      selector: (row) => row.content,
      sortable: true,
      width: "200px",
    },
    {
      name: "Author",
      selector: (row) => row.author?.name || "N/A",
      sortable: true,
      Width: "120px",
    },
    {
      name: "Category",
      selector: (row) => (row.category ? row.category.name : "No Category"),
      Width: "120px",
    },

    {
      name: "Likes",
      selector: (row) => row.likes?.length || 0,
      center: true,
      width: "80px",
    },
    {
      name: "Dislikes",
      selector: (row) => row.dislikes?.length || 0,
      center: true,
      width: "90px",
    },
    {
      name: "Is Featured",
      selector: (row) => (row.isFeatured ? "Yes" : "No"),
      center: true,
      width: "110px",
    },
    {
      name: "Published",
      selector: (row) => (row.published ? "Yes" : "No"),
      center: true,
      width: "100px",
    },
    {
      name: "Views",
      selector: (row) => row.views,
      center: true,
      width: "90px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <Link
            to={`/dashboard/editPost/${row._id}`}
            className="bg-blue-500 text-white px-2 py-2
             rounded hover:bg-blue-800 text-sm"
          >
            <FaEdit />
          </Link>
          <button
            className="bg-red-500 text-white px-2 py-2
            rounded hover:bg-red-800 text-[12px]"
            onClick={() => handleDeletePost(row._id)}
          >
            <FaTrash />
          </button>
        </div>
      ),
      width: "120px",
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
        <h2 className="text-lg font-medium font-RobotoFlex">All Posts</h2>
        <div className="flex items-center gap-4 h-10 w-full mb-4">
          <div className="relative flex-grow">
            <input
              className="border border-gray-300 rounded-md font-RobotoFlex w-full pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-500 transition"
              type="text"
              placeholder="Search post..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <AiOutlineSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 text-lg" />
          </div>

          <Link
            to="/dashboard/addNewPost"
            className="bg-orange-600 text-white rounded px-4
            py-2 font-medium flex items-center gap-1 shadow-md hover:bg-orange-700
            hover:scale-105 transition font-Poppins text-[15px]"
          >
            <FaPlus />
            Add Post
          </Link>
        </div>
        <DataTable
          columns={columns}
          data={query.trim() ? searchResult : posts}
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

export default AllPostDataTable;
