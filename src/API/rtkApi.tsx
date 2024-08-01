import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  peopleJSONResponse,
  PersoneType,
  searchParamsType,
} from '../types/types.tsx';
import parsUrl from '../utils/utils.tsx';

const rtkApi = createApi({
  reducerPath: 'rtkApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    searchRequest: builder.query<peopleJSONResponse, string | null>({
      query: (searchValue) => ({
        url: 'people',
        params: {
          search: searchValue || '',
        },
      }),
    }),
    pageRequest: builder.query<peopleJSONResponse, searchParamsType>({
      query: ({ searchValue, page }) => ({
        url: 'people',
        params: {
          search: searchValue || '',
          page,
        },
      }),
    }),
    personeRequest: builder.query<PersoneType, string>({
      query: (url) => `people/${parsUrl(url)}`,
    }),
  }),
});

export default rtkApi;
