import { createSlice } from '@reduxjs/toolkit';

import { CategoryKV } from '@/dtos/Category';
import { PictogramKV } from '@/dtos/Pictogram';
import { ReviewKV } from '@/dtos/Review';
import type { TagKV } from '@/dtos/Tag';
import axiosInstance from '@/plugins/axios';
import { createAppAsyncThunk } from '@/store/thunk';

interface StatisticsResponse {
  topCategories: (CategoryKV & { total: number; published: number })[];
  topTags: (TagKV & { total: number; published: number })[];
  unpublishedPictograms: PictogramKV[];
  unpublishedReviews: ReviewKV[];
}

interface StatisticsState extends StatisticsResponse {
  loading: boolean;
}

const initialState: StatisticsState = {
  loading: false,
  topCategories: [],
  topTags: [],
  unpublishedPictograms: [],
  unpublishedReviews: []
};

export const requestStatisticsSummary = createAppAsyncThunk('statistics/getSummary', async () => {
  try {
    const response = await axiosInstance.get<undefined, StatisticsResponse>('/statistics/summary');
    return response;
  } catch (error) {
    console.warn(error);
    return;
  }
});

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    resetStatistics: (state) => {
      state.loading = false;
      state.topCategories = [];
      state.topTags = [];
      state.unpublishedPictograms = [];
      state.unpublishedReviews = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestStatisticsSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestStatisticsSummary.rejected, (state) => {
        state.loading = false;
      })
      .addCase(requestStatisticsSummary.fulfilled, (state, action) => {
        if (action.payload) {
          state.topCategories = action.payload.topCategories;
          state.topTags = action.payload.topTags;
          state.unpublishedPictograms = action.payload.unpublishedPictograms;
          state.unpublishedReviews = action.payload.unpublishedReviews;
        }
        state.loading = false;
      });
  }
});

export const { resetStatistics } = statisticsSlice.actions;
