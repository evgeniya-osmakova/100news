import { FC } from 'react'
import { PathRouteProps } from 'react-router-dom'

export enum Pages {
    News = 'News',
    NotFound = 'NotFound',
    NewsDetails = 'NewsDetails'
}

export type PathRouteCustomProps = {
    path: string;
    title?: string;
    component: FC;
};

export type Routes = Record<Pages, PathRouteProps & PathRouteCustomProps>;
