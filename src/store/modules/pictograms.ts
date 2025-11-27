import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { DeleteResponse, Pagination } from '@/dtos';
import type { AddTagsDto, PictogramItem, PictogramKV, PictogramList, UpdatePictogramDto } from '@/dtos/Pictogram';
import axiosInstance from '@/plugins/axios';
import { createAppAsyncThunk } from '@/store/thunk';

interface PictogramsState {
  loading: boolean;
  all: PictogramKV[];
  list: PictogramList[];
  item: PictogramItem | null;
  page: number;
  pageSize: number;
  total: number;
}

const initialState: PictogramsState = {
  loading: false,
  all: [],
  list: [],
  item: null,
  page: 0,
  pageSize: 10,
  total: 0
};

export const requestAllPictograms = createAppAsyncThunk('pictograms/getAll', async () => {
  try {
    const response = await axiosInstance.get<undefined, PictogramKV[]>('/pictograms/all');
    return response;
  } catch {
    return;
  }
});

export const requestPictograms = createAppAsyncThunk(
  'pictograms/getList',
  async (data: { page: number; pageSize: number }) => {
    try {
      const response = await axiosInstance.get<undefined, Pagination<PictogramList>>('/pictograms', {
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

export const requestPictogram = createAppAsyncThunk('pictograms/getItem', async (id: string) => {
  try {
    const response = await axiosInstance.get<undefined, PictogramItem>(`/pictograms/${id}`);
    return response;
  } catch {
    return;
  }
});

export const createPictogram = createAppAsyncThunk('pictograms/postItem', async (data: FormData) => {
  try {
    const response = await axiosInstance.post<FormData, PictogramItem>(`/pictograms`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  } catch {
    return;
  }
});

export const addTags = createAppAsyncThunk('pictograms/addTags', async (data: { id: string; payload: AddTagsDto }) => {
  try {
    const response = await axiosInstance.post<AddTagsDto, PictogramItem>(`/pictograms/${data.id}/tags`, data.payload);
    return response;
  } catch {
    return;
  }
});

export const removeTag = createAppAsyncThunk('pictograms/removeTag', async (data: { id: string; tagId: string }) => {
  try {
    const response = await axiosInstance.delete<undefined, PictogramItem>(`/pictograms/${data.id}/tags/${data.tagId}`);
    return response;
  } catch {
    return;
  }
});

export const updatePictogramVisibility = createAppAsyncThunk('pictograms/updateItemVisibility', async (id: string) => {
  try {
    const response = await axiosInstance.patch<undefined, PictogramItem>(`/pictograms/${id}/visibility`);
    return response;
  } catch {
    return;
  }
});
export const updatePictogram = createAppAsyncThunk(
  'pictograms/updateItem',
  async (data: { id: string; payload: UpdatePictogramDto }) => {
    try {
      const response = await axiosInstance.patch<UpdatePictogramDto, PictogramItem>(
        `/pictograms/${data.id}`,
        data.payload
      );
      return response;
    } catch {
      return;
    }
  }
);
export const deletePictogram = createAppAsyncThunk('pictograms/deleteItem', async (id: string) => {
  try {
    const response = await axiosInstance.delete<undefined, DeleteResponse>(`/pictograms/${id}`);
    return response;
  } catch {
    return;
  }
});

export const pictogramsSlice = createSlice({
  name: 'pictograms',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    resetPictograms: (state) => {
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
      .addCase(requestAllPictograms.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestAllPictograms.rejected, (state) => {
        state.all = [];
        state.loading = false;
      })
      .addCase(requestAllPictograms.fulfilled, (state, action) => {
        if (action.payload) {
          state.all = action.payload;
        }
        state.loading = false;
      });
    builder
      .addCase(requestPictograms.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestPictograms.rejected, (state) => {
        state.list = [];
        state.item = null;
        state.page = 0;
        state.pageSize = 10;
        state.total = 0;
        state.loading = false;
      })
      .addCase(requestPictograms.fulfilled, (state, action) => {
        if (action.payload) {
          state.list = action.payload.items;
          state.total = action.payload.total;
          state.page = action.payload.page;
          state.pageSize = action.payload.pageSize;
        }
        state.loading = false;
      });
    builder
      .addCase(requestPictogram.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestPictogram.rejected, (state) => {
        state.item = null;
        state.loading = false;
      })
      .addCase(requestPictogram.fulfilled, (state, action) => {
        if (action.payload) {
          state.item = action.payload;
        }
        state.loading = false;
      });
    builder
      .addCase(createPictogram.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPictogram.rejected, (state) => {
        state.item = null;
        state.loading = false;
      })
      .addCase(createPictogram.fulfilled, (state, action) => {
        if (action.payload) {
          state.item = action.payload;
        }
        state.loading = false;
      });
    builder
      .addCase(addTags.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTags.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addTags.fulfilled, (state, action) => {
        if (action.payload) {
          state.item = action.payload;
        }
        state.loading = false;
      });
    builder
      .addCase(removeTag.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeTag.rejected, (state) => {
        state.loading = false;
      })
      .addCase(removeTag.fulfilled, (state, action) => {
        if (action.payload) {
          state.item = action.payload;
        }
        state.loading = false;
      });
    builder
      .addCase(updatePictogramVisibility.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePictogramVisibility.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updatePictogramVisibility.fulfilled, (state, action) => {
        if (action.payload) {
          state.item = action.payload;
        }
        state.loading = false;
      });
    builder
      .addCase(deletePictogram.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePictogram.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deletePictogram.fulfilled, (state, action) => {
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

export const { setPage, setPageSize } = pictogramsSlice.actions;
