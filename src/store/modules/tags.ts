import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { DeleteResponse, Pagination } from '@/dtos';
import type { CreateTagDto, TagItem, TagKV, TagList, UpdateTagDto } from '@/dtos/Tag';
import axiosInstance from '@/plugins/axios';
import { createAppAsyncThunk } from '@/store/thunk';

interface TagsState {
  loading: boolean;
  all: TagKV[];
  list: TagList[];
  item: TagItem | null;
  page: number;
  pageSize: number;
  total: number;
}

const initialState: TagsState = {
  loading: false,
  all: [],
  list: [],
  item: null,
  page: 0,
  pageSize: 10,
  total: 0
};

export const requestAllTags = createAppAsyncThunk('tags/getAll', async () => {
  try {
    const response = await axiosInstance.get<undefined, TagKV[]>('/tags/all');
    return response;
  } catch {
    return;
  }
});

export const requestTags = createAppAsyncThunk('tags/getList', async (data: { page: number; pageSize: number }) => {
  try {
    const response = await axiosInstance.get<undefined, Pagination<TagList>>('/tags', {
      params: {
        page: data.page,
        pageSize: data.pageSize
      }
    });
    return response;
  } catch {
    return;
  }
});

export const requestTag = createAppAsyncThunk('tags/getItem', async (id: string) => {
  try {
    const response = await axiosInstance.get<undefined, TagItem>(`/tags/${id}`);
    return response;
  } catch {
    return;
  }
});

export const createTag = createAppAsyncThunk('tags/postItem', async (data: CreateTagDto) => {
  try {
    const response = await axiosInstance.post<CreateTagDto, TagList>(`/tags`, data);
    return response;
  } catch {
    return;
  }
});
export const updateTag = createAppAsyncThunk('tags/updateItem', async (data: { id: string; payload: UpdateTagDto }) => {
  try {
    const response = await axiosInstance.patch<UpdateTagDto, TagList>(`/tags/${data.id}`, data.payload);
    return response;
  } catch {
    return;
  }
});
export const deleteTag = createAppAsyncThunk('tags/deleteItem', async (id: string) => {
  try {
    const response = await axiosInstance.delete<undefined, DeleteResponse>(`/tags/${id}`);
    return response;
  } catch {
    return;
  }
});

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    resetTags: (state) => {
      state.loading = false;
      state.all = [];
      state.list = [];
      state.item = null;
      state.page = 0;
      state.pageSize = 10;
      state.total = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestAllTags.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestAllTags.rejected, (state) => {
        state.all = [];
        state.loading = false;
      })
      .addCase(requestAllTags.fulfilled, (state, action) => {
        if (action.payload) {
          state.all = action.payload;
        }
        state.loading = false;
      });
    builder
      .addCase(requestTags.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestTags.rejected, (state) => {
        state.list = [];
        state.item = null;
        state.page = 0;
        state.pageSize = 10;
        state.total = 0;
        state.loading = false;
      })
      .addCase(requestTags.fulfilled, (state, action) => {
        if (action.payload) {
          state.list = action.payload.items;
          state.total = action.payload.total;
          state.page = action.payload.page;
          state.pageSize = action.payload.pageSize;
        }
        state.loading = false;
      });
    builder
      .addCase(requestTag.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestTag.rejected, (state) => {
        state.item = null;
        state.loading = false;
      })
      .addCase(requestTag.fulfilled, (state, action) => {
        if (action.payload) {
          state.item = action.payload;
        }
        state.loading = false;
      });
    builder
      .addCase(createTag.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTag.rejected, (state) => {
        state.item = null;
        state.loading = false;
      })
      .addCase(createTag.fulfilled, (state, action) => {
        if (action.payload) {
          state.item = { ...action.payload, pictograms: [] };
        }
        state.loading = false;
      });
    builder
      .addCase(updateTag.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTag.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateTag.fulfilled, (state, action) => {
        if (action.payload) {
          const foundIndex = state.list.findIndex((tag) => tag.id === action.payload?.id);
          if (foundIndex > -1) {
            state.list[foundIndex] = action.payload;
          }
        }
        state.loading = false;
      });
    builder
      .addCase(deleteTag.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTag.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        if (action.payload) {
          state.item = null;
          state.all = state.all.filter((i) => i.id !== action.payload!.id);
          state.list = state.list.filter((i) => i.id !== action.payload!.id);
          state.total -= 1;
        }
        state.loading = false;
      });
  }
});

export const { setPage, setPageSize, resetTags } = tagsSlice.actions;
