import { configureStore } from '@reduxjs/toolkit';

import { pictogramsSlice } from '@/store/modules/pictograms';
import { rootSlice } from '@/store/modules/root';
import { usersSlice } from '@/store/modules/users';
import { categoriesSlice } from './modules/categories';
import { reviewsSlice } from './modules/reviews';
import { tagsSlice } from './modules/tags';

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  reducer: {
    root: rootSlice.reducer,
    users: usersSlice.reducer,
    pictograms: pictogramsSlice.reducer,
    reviews: reviewsSlice.reducer,
    tags: tagsSlice.reducer,
    categories: categoriesSlice.reducer
  }
});
