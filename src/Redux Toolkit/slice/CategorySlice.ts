import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAllCategoryData } from "../../services/CategoryService";

interface Category {
  _id: string;
  name: string;
}

interface UserState {
  category: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  category: [],
  loading: false,
  error: null,
};

export const fetchAllCategory = createAsyncThunk<Category[]>(
  "category/fetchAllCategory",
  async () => {
    const res = await getAllCategoryData();
    return res
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchAllCategory.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.loading = false;
          state.category = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchAllCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch category";
      });
  },
});

export default categorySlice.reducer;
