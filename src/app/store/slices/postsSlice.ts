

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPostsByUserId = createAsyncThunk(
  "posts/fetchPostsByUserId",
  async (userId: number) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    return response.data;
  }
);

interface PostsState {
  posts: any[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

 const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostsByUserId.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchPostsByUserId.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch posts";
        state.loading = false;
      });
  },
});

export default postsSlice.reducer;