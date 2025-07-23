import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    comments: string;
  }

interface SearchState {
  query: string;
  results: Post[];
}

const initialState: SearchState = {
  query: '',
  results: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setResults(state, action: PayloadAction<Post[]>) {
      state.results = action.payload;
    },
  },
});

export const { setQuery, setResults } = searchSlice.actions;
export default searchSlice.reducer;
