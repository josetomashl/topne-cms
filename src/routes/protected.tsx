import { Route, Routes } from 'react-router';

import { NavigationLayout } from '@/layouts/Navigation';
import { NotFoundPage } from '@/pages/404';
import { HomePage } from '@/pages/home';
import { Page1 } from '@/pages/page1';
import { Page2 } from '@/pages/page2';

export function ProtectedRoutes() {
  return (
    <Routes>
      {/* Pages with no navigation, useful for being displayed in an app for example */}
      <Route path='app' element={<Page1 />} />

      {/* Pages with navigation */}
      <Route element={<NavigationLayout />}>
        <Route index element={<HomePage />} />
        <Route path='page-1' element={<Page1 />} />
        <Route path='page-2' element={<Page2 />} />
      </Route>

      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}
