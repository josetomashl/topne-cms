import { Route, Routes } from 'react-router';

import { NavigationLayout } from '@/layouts/Navigation';
import { NotFoundPage } from '@/pages/404';
import { CategoriesPage } from '@/pages/categories';
import { AddCategoryPage } from '@/pages/categories/add';
import { HomePage } from '@/pages/home';
import { PictogramsPage } from '@/pages/pictograms';
import { AddPictogramPage } from '@/pages/pictograms/add';
import { ReviewsPage } from '@/pages/reviews';
import { AddReviewPage } from '@/pages/reviews/add';
import { TagsPage } from '@/pages/tags';
import { AddTagPage } from '@/pages/tags/add';
import { UsersPage } from '@/pages/users';
import { AddUserPage } from '@/pages/users/add';

export function ProtectedRoutes() {
  return (
    <Routes>
      {/* Pages with navigation */}
      <Route element={<NavigationLayout />}>
        <Route index element={<HomePage />} />
        <Route path='users' element={<UsersPage />} />
        <Route path='users/add' element={<AddUserPage />} />
        <Route path='reviews' element={<ReviewsPage />} />
        <Route path='reviews/add' element={<AddReviewPage />} />
        <Route path='categories' element={<CategoriesPage />} />
        <Route path='categories/add' element={<AddCategoryPage />} />
        <Route path='pictograms' element={<PictogramsPage />} />
        <Route path='pictograms/add' element={<AddPictogramPage />} />
        <Route path='tags' element={<TagsPage />} />
        <Route path='tags/add' element={<AddTagPage />} />
      </Route>

      {/* Pages with blank layout (no navigation) */}
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}
