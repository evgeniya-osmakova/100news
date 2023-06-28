import { lazy } from 'react';

import { Pages, Routes } from '@/types/Route'

const routes: Routes = {
  [Pages.News]: {
    component: lazy(() => import('@/pages/NewsList/NewsList')),
    path: '/',
  },
  [Pages.NewsDetails]: {
    component: lazy(() => import('@/pages/NewsDetails/NewsDetails')),
    path: '/:id',
  },
  [Pages.NotFound]: {
    component: lazy(() => import('@/pages/NotFound/NotFound')),
    path: '*',
  },
};

export default routes;
