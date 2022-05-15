import { FC, lazy } from 'react';
import { PathRouteProps } from 'react-router-dom';

export enum Pages {
  News,
  NotFound,
  NewsDetails
}

type PathRouteCustomProps = {
  title?: string;
  component: FC;
};

type Routes = Record<Pages, PathRouteProps & PathRouteCustomProps>;

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
