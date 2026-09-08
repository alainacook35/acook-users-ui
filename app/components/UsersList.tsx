import type { AxiosResponse } from "axios";
import { useEffect, useState, type SetStateAction } from "react";
import useAxios from "~/hooks/useAxios";
import type { IUserPageState, IPage, IUser } from "~/utils/interfaces";
import Table from "./Table";
import SearchField from "./SearchField";
import { USER_PAGE_DEFAULT } from "~/utils/constants";
import { isDefined } from "~/utils/helpers";
import Pagination from "./Pagination";

export function UsersList() {
  const axiosInstance = useAxios();
  const [usersPage, setUsersPage] = useState<IUser[] | null>(null);
  const [pageState, setPageState] = useState<IUserPageState>(USER_PAGE_DEFAULT);
  const [selectedPageSize, setSelectedPageSize] = useState<number>(10);

  useEffect(() => {
    axiosInstance.get("/users").then((res: AxiosResponse<IPage<IUser>>) => {
      setUsersPage(res.data.content);
      setPageState((prev) => ({
        ...prev,
        ...res.data,
      }));
    });
  }, []);

  useEffect(() => {
    console.log(pageState);
  }, [pageState]);

  if (usersPage === null) {
    return <></>;
  }

  const setSearchValue = (searchValue: string) => {
    setPageState((prev) => ({ ...prev, search: searchValue }));
  };

  const buildUri = (pageNumber: number, pageSize: number) => {
    let uri = "/users?";

    uri = uri.concat(`page=${pageNumber}&`);

    uri = uri.concat(`size=${[pageSize]}&`);

    if (isDefined(pageState.search)) {
      uri = uri.concat(`search=${pageState.search}&`);
    }
    if (isDefined(pageState.profession)) {
      uri = uri.concat(`profession=${pageState.profession}&`);
    }
    if (isDefined(pageState.city)) {
      uri = uri.concat(`city=${pageState.city}&`);
    }
    if (isDefined(pageState.country)) {
      uri = uri.concat(`country=${pageState.country}&`);
    }

    if (isDefined(pageState.startDate)) {
      uri = uri.concat(`startDate=${pageState.startDate}&`);
    }

    if (isDefined(pageState.endDate)) {
      uri = uri.concat(`endDate=${pageState.endDate}&`);
    }

    if (isDefined(pageState.sortDirection)) {
      uri = uri.concat(`sortDirection=${pageState.sortDirection}&`);
    }

    if (isDefined(pageState.sortBy)) {
      uri = uri.concat(`sortBy=${pageState.sortBy}&`);
    }

    // Remove any trailing & or ?
    if (uri[uri.length - 1] === "&" || uri[uri.length - 1] === "?") {
      uri = uri.substring(0, uri.length - 1);
    }

    return uri;
  };

  const getPage = (pageNumber: number, pageSize: number) => {
    const uri = buildUri(pageNumber, pageSize);

    axiosInstance.get(uri).then((res: AxiosResponse<IPage<IUser>>) => {
      setUsersPage(res.data.content);
      setPageState((prev) => ({
        ...prev,
        ...res.data,
      }));
    });
  };

  const setPageCount = (pageCount: number) => {
    setSelectedPageSize(pageCount);
    getPage(0, pageCount);
  };

  return (
    <div className="flex h-screen min-h-0 w-full flex-col p-2">
      <SearchField
        searchFunction={() => getPage(0, selectedPageSize)}
        setSearchValue={setSearchValue}
        searchValue={pageState.search || ""}
      />
      <div className="min-h-0 flex-1 overflow-y-auto">
        <Table page={usersPage} />
      </div>
      <div className="shrink-0">
        <Pagination
          selectedPageSize={selectedPageSize}
          setSelectedPageSize={setPageCount}
          paginationState={pageState}
          getPage={getPage}
        />
      </div>
    </div>
  );
}
