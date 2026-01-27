import { Route, Routes } from 'react-router';

import { NavigationLayout } from '@/layouts/Navigation';
import { NotFoundPage } from '@/pages/404';
import { CategoriesPage } from '@/pages/categories';
import { AddCategoryPage } from '@/pages/categories/add';
import { EditCategoryPage } from '@/pages/categories/edit';
import { CategoryPage } from '@/pages/categories/id';
import { HomePage } from '@/pages/home';
import { PictogramsPage } from '@/pages/pictograms';
import { AddPictogramPage } from '@/pages/pictograms/add';
import { EditPictogramPage } from '@/pages/pictograms/edit';
import { PictogramPage } from '@/pages/pictograms/id';
import { ReviewsPage } from '@/pages/reviews';
import { AddReviewPage } from '@/pages/reviews/add';
import { EditReviewPage } from '@/pages/reviews/edit';
import { ReviewPage } from '@/pages/reviews/id';
import { TagsPage } from '@/pages/tags';
import { AddTagPage } from '@/pages/tags/add';
import { EditTagPage } from '@/pages/tags/edit';
import { TagPage } from '@/pages/tags/id';
import { UsersPage } from '@/pages/users';
import { AddUserPage } from '@/pages/users/add';
import { EditUserPage } from '@/pages/users/edit';
import { EditAvatarPage } from '@/pages/users/edit/avatar';
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
          <Route path=':id'>
            <Route index element={<UserPage />} />
            <Route path='edit' element={<EditUserPage />} />
            <Route path='edit/avatar' element={<EditAvatarPage />} />
          </Route>
        </Route>

        <Route path='reviews'>
          <Route index element={<ReviewsPage />} />
          <Route path='add' element={<AddReviewPage />} />
          <Route path=':id'>
            <Route index element={<ReviewPage />} />
            <Route path='edit' element={<EditReviewPage />} />
          </Route>
        </Route>

        <Route path='categories'>
          <Route index element={<CategoriesPage />} />
          <Route path='add' element={<AddCategoryPage />} />
          <Route path=':id'>
            <Route index element={<CategoryPage />} />
            <Route path='edit' element={<EditCategoryPage />} />
          </Route>
        </Route>

        <Route path='pictograms'>
          <Route index element={<PictogramsPage />} />
          <Route path='add' element={<AddPictogramPage />} />
          <Route path=':id'>
            <Route index element={<PictogramPage />} />
            <Route path='edit' element={<EditPictogramPage />} />
          </Route>
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
