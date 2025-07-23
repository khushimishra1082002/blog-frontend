import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAllPostsData } from "../../services/PostServices";

interface Category {
  _id: string;
  name: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  category: Category;
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

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  filteredPostByCategory: Post[] | null;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
  filteredPostByCategory: null,
};

export const fetchAllPosts = createAsyncThunk<Post[]>(
  "blog/fetchAllPosts",
  async () => {
    const res = await getAllPostsData();
    return res;
  }
);

const postSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    filteredPostDataByCategory: (state, action: PayloadAction<string>) => {
      const selectedCategory = action.payload;
      const filteredPost = state.posts.filter((post) => {
        const categoryName = post.category?.name;
        return (
          typeof categoryName === "string" &&
          categoryName.toLowerCase() === selectedCategory.toLowerCase()
        );
      });

      state.filteredPostByCategory = filteredPost;

      console.log("Selected Category:", selectedCategory);
      console.log("Filtered Posts:", filteredPost);
      console.log("Filtered Posts:", JSON.parse(JSON.stringify(filteredPost)));

      console.log(
        "Post categories:",
        state.posts.map((post) => post.category)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchAllPosts.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.loading = false;
          state.posts = action.payload;
          state.error = null;
          console.log("Fetched Posts:", action.payload);
        }
      )
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch posts";
      });
  },
});

export const { filteredPostDataByCategory } = postSlice.actions;
export default postSlice.reducer;
