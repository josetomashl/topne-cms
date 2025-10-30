import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Pagination } from '@/dtos';
import type { CreatePictogramDto, PictogramKV, PictogramList, UpdatePictogramDto } from '@/dtos/Pictogram';
import axiosInstance from '@/plugins/axios';
import { createAppAsyncThunk } from '@/store/thunk';

interface PictogramsState {
  loading: boolean;
  all: PictogramKV[];
  list: PictogramList[];
  item: PictogramList | null;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
}

const initialState: PictogramsState = {
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
    const response = await axiosInstance.get<undefined, PictogramList>(`/pictograms/${id}`);
    return response;
  } catch {
    return;
  }
});

export const createPictogram = createAppAsyncThunk('pictograms/postItem', async (data: CreatePictogramDto) => {
  try {
    const response = await axiosInstance.post<CreatePictogramDto, PictogramList>(`/pictograms`, data);
    return response;
  } catch {
    return;
  }
});
export const updatePictogram = createAppAsyncThunk(
  'pictograms/updateItem',
  async (data: { id: string; payload: UpdatePictogramDto }) => {
    try {
      const response = await axiosInstance.patch<UpdatePictogramDto, PictogramList>(
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
    const response = await axiosInstance.delete<undefined, PictogramList>(`/pictograms/${id}`);
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
      state.pagination.page = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pagination.pageSize = action.payload;
    },
    resetPictograms: (state) => {
      state.loading = false;
      state.list = [];
      state.item = null;
      state.pagination = initialState.pagination;
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
        state.pagination = initialState.pagination;
        state.loading = false;
      })
      .addCase(requestPictograms.fulfilled, (state, action) => {
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
      .addCase(updatePictogram.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePictogram.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updatePictogram.fulfilled, (state, action) => {
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
          state.all.filter((i) => i.id !== action.payload!.id);
          state.list.filter((i) => i.id !== action.payload!.id);
        }
        state.loading = false;
      });
  }
});

export const { setPage, setPageSize } = pictogramsSlice.actions;
