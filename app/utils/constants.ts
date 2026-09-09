import type { FilterKey, IPaginationState, IUserSort, IUserFiltersState } from "./interfaces";

export const USER_PAGE_DEFAULT: IPaginationState = {
  number: 0,
  numberOfElements: 10,
  empty: false,
  first: true,
  last: false,
};

export const DEFAULT_SORT: IUserSort = {
  direction: "asc",
  columnName: "lastName",
};

export const DEFAULT_FILTER: IUserFiltersState = {};

export const USER_FILTER_OPTIONS: { label: string; value: keyof IUserFiltersState }[] = [
  { label: "Profession", value: "profession" },
  { label: "City", value: "city" },
  { label: "Country", value: "country" },
  { label: "Created After", value: "startDate" },
  { label: "Created Before", value: "endDate" },
];