import { configureStore } from '@reduxjs/toolkit';

import { categoriesSlice } from '@/store/modules/categories';
import { pictogramsSlice } from '@/store/modules/pictograms';
import { reviewsSlice } from '@/store/modules/reviews';
import { rootSlice } from '@/store/modules/root';
import { statisticsSlice } from '@/store/modules/statistics';
import { tagsSlice } from '@/store/modules/tags';
import { usersSlice } from '@/store/modules/users';

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  reducer: {
    root: rootSlice.reducer,
    users: usersSlice.reducer,
    pictograms: pictogramsSlice.reducer,
    reviews: reviewsSlice.reducer,
    statistics: statisticsSlice.reducer,
    tags: tagsSlice.reducer,
    categories: categoriesSlice.reducer
  }
});
