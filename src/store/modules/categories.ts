import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Pagination } from '@/dtos';
import type { CategoryKV, CategoryList, CreateCategoryDto, UpdateCategoryDto } from '@/dtos/Category';
import axiosInstance from '@/plugins/axios';
import { createAppAsyncThunk } from '@/store/thunk';

interface CategoriesState {
  loading: boolean;
  all: CategoryKV[];
  list: CategoryList[];
  item: CategoryList | null;
  page: number;
  pageSize: number;
  total: number;
}

const initialState: CategoriesState = {
  loading: false,
  all: [],
  list: [],
  item: null,
  page: 0,
  pageSize: 10,
  total: 0
};

export const requestAllCategories = createAppAsyncThunk('Categories/getAll', async () => {
  try {
    const response = await axiosInstance.get<undefined, CategoryKV[]>('/Categories/all');
    return response;
  } catch {
    return;
  }
});

export const requestCategories = createAppAsyncThunk(
  'Categories/getList',
  async (data: { page: number; pageSize: number }) => {
    try {
      const response = await axiosInstance.get<undefined, Pagination<CategoryList>>('/Categories', {
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

export const requestCategory = createAppAsyncThunk('Categories/getItem', async (id: string) => {
  try {
    const response = await axiosInstance.get<undefined, CategoryList>(`/Categories/${id}`);
    return response;
  } catch {
    return;
  }
});

export const createCategory = createAppAsyncThunk('Categories/postItem', async (data: CreateCategoryDto) => {
  try {
    const response = await axiosInstance.post<CreateCategoryDto, CategoryList>(`/Categories`, data);
    return response;
  } catch {
    return;
  }
});
export const updateCategory = createAppAsyncThunk(
  'Categories/updateItem',
  async (data: { id: string; payload: UpdateCategoryDto }) => {
    try {
      const response = await axiosInstance.patch<UpdateCategoryDto, CategoryList>(
        `/Categories/${data.id}`,
        data.payload
      );
      return response;
    } catch {
      return;
    }
  }
);
export const deleteCategory = createAppAsyncThunk('Categories/deleteItem', async (id: string) => {
  try {
    const response = await axiosInstance.delete<undefined, CategoryList>(`/Categories/${id}`);
    return response;
  } catch {
    return;
  }
});

export const categoriesSlice = createSlice({
  name: 'Categories',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    resetCategories: (state) => {
      state.loading = false;
      state.list = [];
      state.item = null;
      state.page = 0;
      state.pageSize = 10;
      state.total = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestAllCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestAllCategories.rejected, (state) => {
        state.all = [];
        state.loading = false;
      })
      .addCase(requestAllCategories.fulfilled, (state, action) => {
        if (action.payload) {
          state.all = action.payload;
        }
        state.loading = false;
      });
    builder
      .addCase(requestCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestCategories.rejected, (state) => {
        state.list = [];
        state.item = null;
        state.page = 0;
        state.pageSize = 10;
        state.total = 0;
        state.loading = false;
      })
      .addCase(requestCategories.fulfilled, (state, action) => {
        if (action.payload) {
          state.list = action.payload.items;
          state.total = action.payload.total;
          state.page = action.payload.page;
          state.pageSize = action.payload.pageSize;
        }
        state.loading = false;
      });
    builder
      .addCase(requestCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestCategory.rejected, (state) => {
        state.item = null;
        state.loading = false;
      })
      .addCase(requestCategory.fulfilled, (state, action) => {
        if (action.payload) {
          state.item = action.payload;
        }
        state.loading = false;
      });
    builder
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategory.rejected, (state) => {
        state.item = null;
        state.loading = false;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        if (action.payload) {
          state.item = action.payload;
        }
        state.loading = false;
      });
    builder
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        if (action.payload) {
          state.item = action.payload;
        }
        state.loading = false;
      });
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        if (action.payload) {
          state.item = null;
          state.all.filter((i) => i.id !== action.payload!.id);
          state.list.filter((i) => i.id !== action.payload!.id);
        }
        state.loading = false;
      });
  }
});

export const { setPage, setPageSize } = categoriesSlice.actions;
