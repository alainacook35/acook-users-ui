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

export interface IUserPageState {
  search?: string;
  // filters
  profession?: string;
  city?: string;
  country?: string;
  startDate?: string;
  endDate?: string;
  // pagination
  sortDirection: "asc" | "desc";
  sortBy: string;
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  totalElements?: number;
  totalPages?: number;
}
