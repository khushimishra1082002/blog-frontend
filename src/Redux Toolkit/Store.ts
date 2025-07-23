import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slice/PostSlice";
import userReducer from "./slice/UserSlice";
import categoryReducer from "./slice/CategorySlice";
import searchReducer from "./slice/SearchSlice";

export const store = configureStore({
  reducer: {
    postsData: postsReducer,
    usersData: userReducer,
    categoryData: categoryReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
