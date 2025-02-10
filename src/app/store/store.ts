

import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./slices/usersSlice";
import postsSlice from "./slices/postsSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    users: usersSlice,
    posts: postsSlice,
  },
});

// Define types for the RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Define typed versions of `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;