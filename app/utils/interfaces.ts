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
    content: T[]
    empty: boolean,
    first: boolean,
    last: boolean,
    number: number,
    numberOfElements: number,
    pageable: {
        offset: number,
        pageNumber: number,
        pageSize: number,
    },
    size: number,
    totalElements: number,
    totalPages: number
}

export interface IUserPageState {
    search?: string;
    profession?: string;
    city?: string;
    country?: string;
    startDate?: string;
    endDate?: string;
    page: number;
    size: number;
    sortDirection: "asc" | "desc";
    sortBy: string;
}