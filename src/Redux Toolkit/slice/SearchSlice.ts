import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { searchPostData } from "../../services/SearchDataService";

interface Post {
  _id: string;
  title: string;
  content: string;
  category: string;
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
  comments?: string;
}

interface SearchState {
  query: string;
  results: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  query: "",
  results: [],
  loading: false,
  error: null,
};

export const searchPosts = createAsyncThunk<Post[], string>(
  "search/searchPosts",
  async (query, { rejectWithValue }) => {
    try {
      const res = await searchPostData(query);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    clearResults(state) {
      state.results = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        searchPosts.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.loading = false;
          state.results = action.payload;
        },
      )
      .addCase(searchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setQuery, clearResults } = searchSlice.actions;
export default searchSlice.reducer;
