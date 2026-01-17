import React, { useEffect } from "react";
import Header from "../components/Header";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa6";
import { LuMessageCircleMore } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../Redux Toolkit/Store";
import { fetchAllPosts } from "../Redux Toolkit/slice/PostSlice";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaTrash } from "react-icons/fa6";
import conf from "../config/Conf";
import { FaCamera } from "react-icons/fa";
import { useState } from "react";
import EditProfileModel from "../model/EditProfileModel";
import { getImageUrl } from "../utils/getImageUrls";

interface DecodedTokenType {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.profile);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  console.log("selectedImage", selectedImage);

  const [preview, setPreview] = useState<string | null>(null);

  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  console.log("storedUser", storedUser);

  // const user = storedUser ? JSON.parse(storedUser) : null;
  const [currentUser, setCurrentUser] = useState(user);

  console.log("currentUser:", currentUser);
  console.log("userId:", currentUser?._id);

  let userId: string | null = null;

  if (token) {
    const decodedToken: DecodedTokenType = jwtDecode(token);
    userId = decodedToken?.id;
  }

  const { posts, loading, error } = useSelector(
    (state: RootState) => state.postsData
  );

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  const userPosts = posts.filter((post) => post.author?._id === userId);

  console.log("userPosts", userPosts);

  const totalLikes = userPosts.reduce(
    (acc, post) => acc + (post.likes?.length || 0),
    0
  );

  const totalViews = userPosts.reduce(
    (acc, post) => acc + (post.views || 0),
    0
  );

  const totalComments = userPosts.reduce(
    (acc, post) => acc + (post.comments?.length || 0),
    0
  );

  const handleDeletePost = async (postId: string) => {
    console.log("postId", postId);
    const token = localStorage.getItem("token");
    console.log("token", token);

    if (!token) {
      alert("You are not authenticated. Please log in.");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/blog-posts/deletePost/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("response", response);

      if (response.status === 200) {
        alert("Post deleted successfully!");
        dispatch(fetchAllPosts());
      } else {
        alert("Failed to delete post. Please try again.");
      }
    } catch (error:any) {
      console.error("Error deleting post:", error);
      if (error.response) {
        console.error("Error response status:", error.response.status);
        console.error("Error response data:", error.response.data);
      }
      alert("An error occurred while deleting the post. Please try again.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleUploadImage = async () => {
    if (!selectedImage || !currentUser?._id) {
      alert("No image selected or user not loaded");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage); // MUST match multer field name
    formData.append("name", currentUser.name);
    formData.append("email", currentUser.email);
    formData.append("role", currentUser.role);

    try {
      const res = await axios.put(
        `http://localhost:5000/api/users/updateUser/${currentUser._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // 🔑 important
          },
        }
      );

      console.log("response:", res.data);

      alert("Image updated successfully ✅");
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.dispatchEvent(new Event("userUpdated"));
      setCurrentUser(res.data.user);
      setPreview(null);
      setSelectedImage(null);
    } catch (error: any) {
      console.error("Error uploading image:", error.response || error.message);
      alert("Image upload failed ❌");
    }
  };

  return (
    <>
      <div className="relative h-96 w-full">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
          alt="Profile background"
        />
        {/* <div className="w-20 h-20 rounded-full absolute -bottom-7 left-14">
          <img
            className="w-full h-full rounded-full"
            src={
              user?.image ? `${conf.BaseURL}${conf.ImageUploadUrl}/${user.image}` : "https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
            }
            alt={user?.name}
          />


        </div> */}

        <div className="w-20 h-20 rounded-full absolute -bottom-7 left-14 group">
          <img className="w-full h-full rounded-full" src={getImageUrl(user?.image)} />

          {/* Camera Icon */}
          {/* <label
            className="absolute bottom-0 right-0 bg-black text-white p-1 rounded-full
                    cursor-pointer opacity-0 group-hover:opacity-100 transition"
          >
            <FaCamera size={12} />
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleImageChange(e)}
            />
          </label> */}
        </div>

        {selectedImage && (
          <button
            onClick={handleUploadImage}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2
               bg-black text-white px-3 py-1 text-xs rounded"
          >
            Save
          </button>
        )}

        <div className="pt-12 grid grid-cols-1 md:grid-cols-3 w-11/12 m-auto gap-14">
          <div className="flex flex-col gap-1">
            <h4 className="font-Poppins text-xl font-medium">{user?.name}</h4>
            <span className="font-Poppins font-semibold text-[14px] text-cyan-500">
              {user?.email}
            </span>

            <button
              className="mt-3 w-fit bg-gray-900 text-white text-sm px-4 py-2 rounded
               hover:bg-gray-700 transition"
              onClick={() => setOpenEditModal(true)}
            >
              Edit Profile
            </button>

            <div className="grid grid-cols-2 border border-black/10 my-4">
              <div className="border border-black/10 flex flex-col justify-center p-6">
                <h4 className="text-lg font-medium font-Roboto">
                  {userPosts.length}
                </h4>
                <span className="font-Roboto text-gray-500 text-sm">Posts</span>
              </div>
              <div className="border border-black/10 flex flex-col justify-center p-6">
                <h4 className="text-lg font-medium font-Roboto">
                  {totalViews}
                </h4>
                <span className="font-Roboto text-gray-500 text-sm">Views</span>
              </div>
              <div className="border border-black/10 flex flex-col justify-center p-6">
                <h4 className="text-lg font-medium font-Roboto">
                  {totalLikes}
                </h4>
                <span className="font-Roboto text-gray-500 text-sm">Likes</span>
              </div>
              <div className="border border-black/10 flex flex-col justify-center p-6">
                <h4 className="text-lg font-medium font-Roboto">
                  {totalComments}
                </h4>
                <span className="font-Roboto text-gray-500 text-sm">
                  Comments
                </span>
              </div>
            </div>
          </div>

          <div className="col-span-2 space-y-5 md:py-7 ">
            <div className=" flex flex-col sm:flex-row md:flex-row sm:items-center  justify-between md:items-center space-y-6 ">
              <div className="flex gap-4">
                <div>
                  <span className="border border-black/10 p-1 text-sm text-gray-800 font-Poppins font-medium">
                    Posts
                  </span>
                  <span className="border border-black/10 py-1 px-2 text-sm text-gray-800 font-Poppins">
                    {userPosts.length}
                  </span>
                </div>
                <div>
                  <span className="border border-black/10 py-1 px-2 text-sm text-gray-800 font-Poppins font-medium">
                    Views
                  </span>
                  <span className="border border-black/10 py-1 px-2 text-sm text-gray-500 font-Poppins">
                    {totalViews}
                  </span>
                </div>
                <div>
                  <span className="border border-black/10 py-1 px-2 text-sm text-gray-800 font-Poppins font-medium">
                    Likes
                  </span>
                  <span className="border border-black/10 py-1 px-2 text-sm text-gray-800 font-Poppins">
                    {totalLikes}
                  </span>
                </div>
              </div>
              <div>
                <Link to="/addPost">
                  <button className="bg-gray-950 text-white font-Inter rounded-sm hover:scale-105 duration-500 text-sm p-2">
                    Add New Post
                  </button>
                </Link>
              </div>
            </div>
            <div className="w-full h-[1px] bg-gray-200"></div>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-7 gap-y-8
  h-60 overflow-y-auto"
            >
              {userPosts.length > 0 ? (
                userPosts.map((post) => (
                  <div key={post._id} className="space-y-4">
                    <div className="w-full h-60 rounded-md">
                      <img
                        className="w-full h-full shadow-lg object-cover
              transition-transform duration-300 ease-in-out rounded"
                        src={getImageUrl(post.image)}
                        alt={post.title}
                      />
                    </div>

                    <div>
                      <p>{post.title}</p>
                      <p className="text-xs line-clamp-2 font-Poppins font-light">
                        {post.content}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 justify-between">
                      <div className="flex gap-2 items-center">
                        <div className="w-6 h-6 rounded-full">
                          <img
                            className="w-full h-full rounded-full"
                            src={
                              post?.author?.image
                                ? getImageUrl(post.author.image)
                                : "https://cdn-icons-png.flaticon.com/512/9385/9385289.png" // <-- default image stored in /public folder
                            }
                            alt={post.author.name}
                          />
                        </div>
                        <span className="font-Roboto text-sm">
                          {post.author.name}
                        </span>
                      </div>

                      <div className="flex justify-end gap-4 text-gray-500 text-sm items-center">
                        <span className="flex items-center gap-1">
                          <FaRegThumbsUp /> {post.likes?.length || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <LuMessageCircleMore /> {post.comments?.length || 0}
                        </span>
                        <button
                          className="bg-red-500 text-white px-2 py-2
                rounded hover:bg-red-800 text-[12px]"
                          onClick={() => handleDeletePost(post._id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  className="col-span-full flex justify-center items-center 
    h-full text-gray-500 font-medium font-Roboto"
                >
                  No posts yet
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {openEditModal && (
        <EditProfileModel
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
        />
      )}
    </>
  );
};

export default Profile;
