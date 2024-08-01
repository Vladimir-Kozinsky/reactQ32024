export type PersoneType = {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  url: string;
};

export type peopleJSONResponse = {
  results: PersoneType[];
  count: number;
};

export type searchParamsType = {
  searchValue: string;
  page: string;
};
