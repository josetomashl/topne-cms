import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { DeleteResponse, Pagination } from '@/dtos';
import type { CreateUserDto, UpdateUserDto, UpdateUserPasswordDto, UserItem, UserKV, UserList } from '@/dtos/User';
import axiosInstance from '@/plugins/axios';
import { createAppAsyncThunk } from '@/store/thunk';

interface UsersState {
  loading: boolean;
  all: UserKV[];
  list: UserList[];
  item: UserItem | null;
  page: number;
  pageSize: number;
  total: number;
}

const initialState: UsersState = {
  loading: false,
  all: [],
  list: [],
  item: null,
  page: 0,
  pageSize: 10,
  total: 0
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
export const updateUserPassword = createAppAsyncThunk(
  'users/updateItemPassword',
  async (data: { id: string; payload: UpdateUserPasswordDto }) => {
    try {
      const response = await axiosInstance.patch<UpdateUserPasswordDto, UserItem>(
        `/users/${data.id}/password`,
        data.payload
      );
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
      const response = await axiosInstance.patch<FormData, UserItem>(`/users/${data.id}/avatar`, formData, {
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
    const response = await axiosInstance.delete<undefined, DeleteResponse>(`/users/${id}`);
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
      state.page = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    resetUsers: (state) => {
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
        state.page = 0;
        state.pageSize = 10;
        state.total = 0;
        state.loading = false;
      })
      .addCase(requestUsers.fulfilled, (state, action) => {
        if (action.payload) {
          state.list = action.payload.items;
          state.total = action.payload.total;
          state.page = action.payload.page;
          state.pageSize = action.payload.pageSize;
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
      .addCase(updateUserPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserPassword.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
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
          state.all = state.all.filter((i) => i.id !== action.payload!.id);
          state.list = state.list.filter((i) => i.id !== action.payload!.id);
          state.total -= 1;
        }
        state.loading = false;
      });
  }
});

export const { setPage, setPageSize, resetUsers } = usersSlice.actions;
