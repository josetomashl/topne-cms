import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Pagination } from '@/dtos';
import type { CreateReviewDto, ReviewKV, ReviewList, UpdateReviewDto } from '@/dtos/Review';
import axiosInstance from '@/plugins/axios';
import { createAppAsyncThunk } from '@/store/thunk';

interface ReviewsState {
  loading: boolean;
  all: ReviewKV[];
  list: ReviewList[];
  item: ReviewList | null;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
}

const initialState: ReviewsState = {
  loading: false,
  all: [],
  list: [],
  item: null,
  pagination: {
    page: 0,
    pageSize: 10,
    total: 0
  }
};

export const requestAllReviews = createAppAsyncThunk('reviews/getAll', async () => {
  try {
    const response = await axiosInstance.get<undefined, ReviewKV[]>('/reviews/all');
    return response;
  } catch {
    return;
  }
});

export const requestReviews = createAppAsyncThunk(
  'reviews/getList',
  async (data: { page: number; pageSize: number }) => {
    try {
      const response = await axiosInstance.get<undefined, Pagination<ReviewList>>('/reviews', {
        params: {
          page: data.page,
          pageSize: data.pageSize
        }
      });
      return response;
    } catch {
      return;
    }
  }
);

export const requestReview = createAppAsyncThunk('reviews/getItem', async (id: string) => {
  try {
    const response = await axiosInstance.get<undefined, ReviewList>(`/reviews/${id}`);
    return response;
  } catch {
    return;
  }
});

export const createReview = createAppAsyncThunk('reviews/postItem', async (data: CreateReviewDto) => {
  try {
    const response = await axiosInstance.post<CreateReviewDto, ReviewList>(`/reviews`, data);
    return response;
  } catch {
    return;
  }
});
export const updateReview = createAppAsyncThunk(
  'reviews/updateItem',
  async (data: { id: string; payload: UpdateReviewDto }) => {
    try {
      const response = await axiosInstance.patch<UpdateReviewDto, ReviewList>(`/reviews/${data.id}`, data.payload);
      return response;
    } catch {
      return;
    }
  }
);
export const deleteReview = createAppAsyncThunk('reviews/deleteItem', async (id: string) => {
  try {
    const response = await axiosInstance.delete<undefined, ReviewList>(`/reviews/${id}`);
    return response;
  } catch {
    return;
  }
});

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pagination.pageSize = action.payload;
    },
    resetReviews: (state) => {
      state.loading = false;
      state.list = [];
      state.item = null;
      state.pagination = initialState.pagination;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestAllReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestAllReviews.rejected, (state) => {
        state.all = [];
        state.loading = false;
      })
      .addCase(requestAllReviews.fulfilled, (state, action) => {
        if (action.payload) {
          state.all = action.payload;
        }
        state.loading = false;
      });
    builder
      .addCase(requestReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestReviews.rejected, (state) => {
        state.list = [];
        state.item = null;
        state.pagination = initialState.pagination;
        state.loading = false;
      })
      .addCase(requestReviews.fulfilled, (state, action) => {
        if (action.payload) {
          state.list = action.payload.items;
          state.pagination = {
            ...state.pagination,
            // page: action.payload.page,
            // pageSize: action.payload.pageSize,
            total: action.payload.total
          };
        }
        state.loading = false;
      });
    builder
      .addCase(requestReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestReview.rejected, (state) => {
        state.item = null;
        state.loading = false;
      })
      .addCase(requestReview.fulfilled, (state, action) => {
        if (action.payload) {
          state.item = action.payload;
        }
        state.loading = false;
      });
    builder
      .addCase(createReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReview.rejected, (state) => {
        state.item = null;
        state.loading = false;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        if (action.payload) {
          state.item = action.payload;
        }
        state.loading = false;
      });
    builder
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateReview.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        if (action.payload) {
          state.item = action.payload;
        }
        state.loading = false;
      });
    builder
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReview.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        if (action.payload) {
          state.item = null;
          state.all.filter((i) => i.id !== action.payload!.id);
          state.list.filter((i) => i.id !== action.payload!.id);
        }
        state.loading = false;
      });
  }
});

export const { setPage, setPageSize } = reviewsSlice.actions;
