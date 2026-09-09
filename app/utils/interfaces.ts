export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profession: string;
  city: string;
  country: string;
  dateCreated: string;
}

export interface IUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  profession: string;
  city: string;
  country: string;
}

export interface IPage<T> {
  content: T[];
  sortDirection: "asc" | "desc";
  sortBy: string;
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
}

export interface IPaginationState {
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  totalElements?: number;
  totalPages?: number;
}

export interface IUserSort {
  direction: "asc" | "desc";
  columnName: keyof IUser;
}

/**
 * The set of user attributes we allow filtering on. Deliberately a standalone
 * shape rather than being derived from IUser: it drops id/firstName/lastName/email,
 * and splits dateCreated into a startDate/endDate range.
 */
export interface IUserFiltersState {
  profession?: string;
  city?: string;
  country?: string;
  startDate?: string;
  endDate?: string;
}

export type FilterKey = keyof IUserFiltersState;
