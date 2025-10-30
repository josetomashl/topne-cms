import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Pagination } from '@/dtos';
import type { CreateUserDto, UpdateUserDto, UserItem, UserKV, UserList } from '@/dtos/User';
import axiosInstance from '@/plugins/axios';
import { createAppAsyncThunk } from '@/store/thunk';

interface UsersState {
  loading: boolean;
  all: UserKV[];
  list: UserList[];
  item: UserItem | null;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
}

const initialState: UsersState = {
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

export const requestAllUsers = createAppAsyncThunk('users/getAll', async () => {
  try {
    const response = await axiosInstance.get<undefined, UserList[]>('/users/all');
    return response;
  } catch {
    return;
  }
});

export const requestUsers = createAppAsyncThunk('users/getList', async (data: { page: number; pageSize: number }) => {
  try {
    const response = await axiosInstance.get<undefined, Pagination<UserList>>('/users', {
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

export const requestUser = createAppAsyncThunk('users/getItem', async (id: string) => {
  try {
    const response = await axiosInstance.get<undefined, UserItem>(`/users/${id}`);
    return response;
  } catch {
    return;
  }
});

export const createUser = createAppAsyncThunk('users/postItem', async (data: CreateUserDto) => {
  try {
    const response = await axiosInstance.post<CreateUserDto, UserItem>(`/users`, data);
    return response;
  } catch {
    return;
  }
});
export const updateUser = createAppAsyncThunk(
  'users/updateItem',
  async (data: { id: string; payload: UpdateUserDto }) => {
    try {
      const response = await axiosInstance.patch<UpdateUserDto, UserItem>(`/users/${data.id}`, data.payload);
      return response;
    } catch {
      return;
    }
  }
);
export const updateUserAvatar = createAppAsyncThunk(
  'users/updateItemAvatar',
  async (data: { id: string; payload: File }) => {
    const formData = new FormData();
    formData.append('file', data.payload);
    try {
      const response = await axiosInstance.patch<UpdateUserDto, UserItem>(`/users/${data.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response;
    } catch {
      return;
    }
  }
);
export const deleteUser = createAppAsyncThunk('users/deleteItem', async (id: string) => {
  try {
    const response = await axiosInstance.delete<undefined, UserItem>(`/users/${id}`);
    return response;
  } catch {
    return;
  }
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pagination.pageSize = action.payload;
    },
    resetUsers: (state) => {
      state.loading = false;
      state.all = [];
      state.list = [];
      state.item = null;
      state.pagination = initialState.pagination;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestAllUsers.rejected, (state) => {
        state.all = [];
        state.loading = false;
      })
      .addCase(requestAllUsers.fulfilled, (state, action) => {
        if (action.payload) {
          state.all = action.payload;
        }
        state.loading = false;
      });
    builder
      .addCase(requestUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestUsers.rejected, (state) => {
        state.list = [];
        state.item = null;
        state.pagination = initialState.pagination;
        state.loading = false;
      })
      .addCase(requestUsers.fulfilled, (state, action) => {
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
      .addCase(requestUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestUser.rejected, (state) => {
        state.item = null;
        state.loading = false;
      })
      .addCase(requestUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.item = action.payload;
        }
        state.loading = false;
      });
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.rejected, (state) => {
        state.item = null;
        state.loading = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.item = action.payload;
        }
        state.loading = false;
      });
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.item = action.payload;
        }
        state.loading = false;
      });
    builder
      .addCase(updateUserAvatar.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserAvatar.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        if (action.payload) {
          state.item = action.payload;
        }
        state.loading = false;
      });
    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.item = null;
          state.all.filter((i) => i.id !== action.payload!.id);
          state.list.filter((i) => i.id !== action.payload!.id);
        }
        state.loading = false;
      });
  }
});

export const { setPage, setPageSize } = usersSlice.actions;
