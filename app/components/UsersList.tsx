import type { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import useAxios from "~/hooks/useAxios";
import type {
  IPaginationState,
  IPage,
  IUser,
  IUserSort,
  IUserFiltersState,
} from "~/utils/interfaces";
import Table from "./Table";
import SearchField from "./SearchField";
import { DEFAULT_SORT, USER_PAGE_DEFAULT } from "~/utils/constants";
import { isDefined } from "~/utils/helpers";
import Pagination from "./Pagination";
import IconButton from "./IconButton";
import { FaFilter, FaPlus } from "react-icons/fa";
import { Popover } from "@mui/material";
import Button from "./Button";
import UserFilters from "./UserFilters";
import { useToast } from "../hooks/useToast";

export function UsersList() {
  const axiosInstance = useAxios();
  const [usersPage, setUsersPage] = useState<IUser[] | null>(null);
  const [pageState, setPageState] =
    useState<IPaginationState>(USER_PAGE_DEFAULT);
  const [selectedPageSize, setSelectedPageSize] = useState<number>(10);
  const [selectedFilters, setSelectedFilters] = useState<IUserFiltersState>({});
  const [selectedSort, setSelectedSort] = useState<IUserSort>(DEFAULT_SORT);
  const [search, setSearchValue] = useState("");
  const [filterPopoverAnchor, setFilterPopoverAnchor] =
    useState<HTMLButtonElement | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    axiosInstance.get("/users").then((res: AxiosResponse<IPage<IUser>>) => {
      setUsersPage(res.data.content);
      setPageState((prev) => ({
        ...prev,
        ...res.data,
      }));
    });
  }, []);

  const buildUri = (pageNumber: number, pageSize: number) => {
    let uri = "/users?";

    uri = uri.concat(`page=${pageNumber}&`);

    uri = uri.concat(`size=${[pageSize]}&`);

    if (isDefined(selectedFilters)) {
      uri = uri.concat(`search=${search}&`);
    }
    if (isDefined(selectedFilters.profession)) {
      uri = uri.concat(`profession=${selectedFilters.profession}&`);
    }
    if (isDefined(selectedFilters.city)) {
      uri = uri.concat(`city=${selectedFilters.city}&`);
    }
    if (isDefined(selectedFilters.country)) {
      uri = uri.concat(`country=${selectedFilters.country}&`);
    }

    if (isDefined(selectedFilters.startDate)) {
      uri = uri.concat(`startDate=${selectedFilters.startDate}&`);
    }

    if (isDefined(selectedFilters.endDate)) {
      uri = uri.concat(`endDate=${selectedFilters.endDate}&`);
    }

    if (isDefined(selectedSort)) {
      uri = uri.concat(`sortDirection=${selectedSort.direction}&`);

      uri = uri.concat(`sortBy=${selectedSort.columnName}&`);
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

  const openFilterPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterPopoverAnchor(event.currentTarget);
  };

  const handleFilterPopoverClose = (
    newFilterState: IUserFiltersState | null,
  ) => {
    setFilterPopoverAnchor(null);
    if (newFilterState !== null) {
      setSelectedFilters(newFilterState);
    }
  };

  const deleteAction = (id: number) => {
    axiosInstance.delete(`/users/${id}`).then(() => {
      toast(`Successfully delete user ${id}`, { severity: "success" })
    }).catch((err) => {
      toast(`Failed to delete user ${id}`, { severity: "error" })
    });
  };
  
  useEffect(() => {
    getPage(0, selectedPageSize);
  }, [selectedSort, selectedPageSize, selectedFilters, search]);

  if (usersPage === null) {
    return <></>;
  }

  return (
    <div className="flex flex-1 min-h-0 w-full flex-col px-2 pt-1 pb-2">
      <div className="flex justify-between">
        <div className="my-auto">
          <Button suffixIcon={<FaPlus />}>Create</Button>
        </div>
        <div className="flex gap-5">
          <SearchField searchFunction={setSearchValue} />
          <div className="my-auto">
            <IconButton icon={<FaFilter />} onClick={openFilterPopover} />
          </div>
          <Popover
            open={Boolean(filterPopoverAnchor)}
            id="filter-popover"
            anchorEl={filterPopoverAnchor}
            onClose={handleFilterPopoverClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  borderRadius: "var(--radius-lg)",
                  boxShadow: "none",
                  border: "2px solid var(--color-accent)",
                },
              },
            }}
          >
            <div className="h-100 w-100 bg-white m-auto p-5">
              <UserFilters
                userFilters={selectedFilters}
                setUserFilters={handleFilterPopoverClose}
              />
            </div>
          </Popover>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto border-2 border-solid border-gray-400 rounded-sm">
        <Table
          page={usersPage}
          sort={selectedSort}
          setSort={setSelectedSort}
          deleteAction={deleteAction}
        />
      </div>
      <div className="shrink-0">
        <Pagination
          selectedPageSize={selectedPageSize}
          setSelectedPageSize={setSelectedPageSize}
          paginationState={pageState}
          getPage={getPage}
        />
      </div>
    </div>
  );
}
