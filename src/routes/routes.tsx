import { createBrowserRouter } from 'react-router-dom';

import AppLayout from '@components/layout/AppLayout';
import CatList from '@/pages/Catlist';
import Breeds from '@pages/Breeds';
import Favorites from '@pages/Favorites';
import NotFound from '@pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <CatList />,
      },
      {
        path: 'breeds',
        element: <Breeds />,
      },
      {
        path: 'favorites',
        element: <Favorites />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
