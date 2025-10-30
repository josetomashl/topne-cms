import { Route, Routes } from 'react-router';

import { NavigationLayout } from '@/layouts/Navigation';
import { NotFoundPage } from '@/pages/404';
import { HomePage } from '@/pages/home';
import { Page2 } from '@/pages/pictograms';
import { Page1 } from '@/pages/users';

export function ProtectedRoutes() {
  return (
    <Routes>
      {/* Pages with navigation */}
      <Route element={<NavigationLayout />}>
        <Route index element={<HomePage />} />
        <Route path='users' element={<Page1 />} />
        <Route path='pictograms' element={<Page1 />} />
        <Route path='tags' element={<Page2 />} />
        <Route path='reviews' element={<Page2 />} />
        <Route path='categories' element={<Page2 />} />
      </Route>

      {/* Pages with no navigation, useful for being displayed in an app for example */}
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}
