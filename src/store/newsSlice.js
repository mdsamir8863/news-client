"use client";
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  news: [],
  category: 'Technology',
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNews: (state, action) => {
      state.news = action.payload;
    },
    addNews: (state, action) => {
      state.news.unshift(action.payload);
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { setNews, addNews, setCategory } = newsSlice.actions;
export default newsSlice.reducer;
