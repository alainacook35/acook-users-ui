import type { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import useAxios from "~/hooks/useAxios";
import type { IUserPageState, IPage, IUser } from "~/utils/interfaces";
import Table from "./Table";
import SearchField from "./SearchField";
import { USER_PAGE_DEFAULT } from "~/utils/constants";

export function UsersList() {
  const axiosInstance = useAxios();
  const [usersPage, setUsersPage] = useState<IPage<IUser> | null>(null);
  const [pageState, setPageState] = useState<IUserPageState>(USER_PAGE_DEFAULT);

  useEffect(() => {
    axiosInstance.get("/users").then((res: AxiosResponse<IPage<IUser>>) => {
      setUsersPage(res.data);
    });
  }, []);

  if (usersPage === null) {
    return <></>;
  }

  const setSearchValue = (searchValue: string) => {
    setPageState((prev) => ({ ...prev, search: searchValue }));
  };

  const getPage = () => {
    const uri = "/users?"
    if (pageState.search?.trim() != "") {
      uri.concat(`search=${pageState.search}&`)
    }
    if (pageState.profession?.trim() != "") {
      uri.concat(`profession=${pageState.profession}&`)
    }
    if (pageState.city?.trim() != "") {
      uri.concat(`city=${pageState.city}&`)
    }
    if (pageState.country?.trim() != "") {
      uri.concat(`country=${pageState.country}&`)
    }

    // TODO: Date created range
  }

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="min-h-0">
        <SearchField
          searchFunction={getPage}
          setSearchValue={setSearchValue}
          searchValue={pageState.search || ""}
        />
        <Table page={usersPage} />
      </div>
    </main>
  );
}
