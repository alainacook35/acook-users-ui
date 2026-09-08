import type { IUserPageState } from "./interfaces";

export const USER_PAGE_DEFAULT: IUserPageState = {
    number: 0,
    numberOfElements: 10,
    sortDirection: "asc",
    sortBy: "lastName",
    empty: false,
    first: true,
    last: false,
}