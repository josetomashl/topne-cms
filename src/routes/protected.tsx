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
import { EditTagPage } from '@/pages/tags/edit';
import { TagPage } from '@/pages/tags/id';
import { UsersPage } from '@/pages/users';
import { AddUserPage } from '@/pages/users/add';
import { UserPage } from '@/pages/users/id';

export function ProtectedRoutes() {
  return (
    <Routes>
      {/* Pages with navigation */}
      <Route element={<NavigationLayout />}>
        <Route index element={<HomePage />} />

        <Route path='users'>
          <Route index element={<UsersPage />} />
          <Route path='add' element={<AddUserPage />} />
          <Route path=':id' element={<UserPage />} />
        </Route>

        <Route path='reviews'>
          <Route index element={<ReviewsPage />} />
          <Route path='add' element={<AddReviewPage />} />
        </Route>

        <Route path='categories'>
          <Route index element={<CategoriesPage />} />
          <Route path='add' element={<AddCategoryPage />} />
        </Route>

        <Route path='pictograms'>
          <Route index element={<PictogramsPage />} />
          <Route path='add' element={<AddPictogramPage />} />
        </Route>

        <Route path='tags'>
          <Route index element={<TagsPage />} />
          <Route path='add' element={<AddTagPage />} />
          <Route path=':id'>
            <Route index element={<TagPage />} />
            <Route path='edit' element={<EditTagPage />} />
          </Route>
        </Route>
      </Route>

      {/* Pages with blank layout (no navigation) */}
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}
