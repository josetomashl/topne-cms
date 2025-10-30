import { configureStore } from '@reduxjs/toolkit';

import { pictogramsSlice } from '@/store/modules/pictograms';
import { rootSlice } from '@/store/modules/root';
import { usersSlice } from '@/store/modules/users';

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  reducer: {
    root: rootSlice.reducer,
    users: usersSlice.reducer,
    pictograms: pictogramsSlice.reducer
  }
});
