import { peopleJSONResponse } from '../types/types.tsx';

const peopleAPI = {
  async searchRequest(searchValue: string) {
    const url = `https://swapi.dev/api/people/?${new URLSearchParams({
      search: searchValue || '',
    })}`;
    const response = await fetch(url);
    const resp: peopleJSONResponse = await response.json();
    return resp;
  },
  async pageRequest(searchParams: { searchValue: string; page: string }) {
    const { searchValue, page } = searchParams;
    const url = `https://swapi.dev/api/people/?${new URLSearchParams({
      search: searchValue || '',
      page,
    })}`;
    const response = await fetch(url);
    const resp: peopleJSONResponse = await response.json();
    return resp;
  },
  async personeRequest(url: string) {
    const response = await fetch(url);
    const resp = await response.json();
    return resp;
  },
};

export default peopleAPI;
