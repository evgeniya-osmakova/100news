import { api, doFetch } from './helpers'
import { News, NewsContent } from '@/models/models';

export const getNews = async () =>
  doFetch<News[]>(`${api}/news`)

export const getNewsContent = async (id: string) =>
  doFetch<NewsContent>(`${api}/item/${id}`)
