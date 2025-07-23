const conf = {
  BaseURL: String(import.meta.env.VITE_BASE_URL),
  RegisterUrl: "/auth/register",
  LoginUrl: "/auth/login",
  GetAllPostsUrl: "/blog-posts/getPost",
  CreateNewPostUrl: "/blog-posts/createPost",
  SinglePostUrl: "/blog-posts/singlePost",
  UpdatePostUrl: "/blog-posts/updatePost",
  DeletePostUrl: "/blog-posts/deletePost", 
  GetAllCategoryUrl:"/category/allCategory",
  SingleCategoryUrl:"/category/singleCategory",
  CreateNewCategoryUrl:"/category/addCategory",
  UpdateCategoryUrl:"/category/editCategory",
  DeleteCategoryUrl:"/category/deleteCategory",
  GetAllUsersUrl:"/users/getUsers",
  SingleUserUrl:"/users/getSingleUser",
  CreateNewUserUrl:"/users/createUser",
  UpdateUserUrl:"/users/updateUser",
  DeleteUserUrl:"/users/deleteUser",
  SearchPostUrl:"/search/searchPost",
  SearchCategoryUrl:"/search/searchCategory",
  SearchUserUrl:"/search/searchUser",
  ChangePasswordUrl:"/users/changePassword",
  SubsribeUrl:"/subscribe/subscribeEmail"
};

export default conf;
