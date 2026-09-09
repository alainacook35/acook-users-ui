import type { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
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
import { CircularProgress, Popover } from "@mui/material";
import Button from "./Button";
import UserFilters from "./UserFilters";
import { useToast } from "../hooks/useToast";
import CreateUserModal from "./CreateUserModal";

export function UsersList() {
  const axiosInstance = useAxios();
  const [usersPage, setUsersPage] = useState<IUser[] | null>(null);
  const [pageState, setPageState] =
    useState<IPaginationState>(USER_PAGE_DEFAULT);
  const [selectedPageSize, setSelectedPageSize] = useState<number>(USER_PAGE_DEFAULT.numberOfElements);
  const [selectedFilters, setSelectedFilters] = useState<IUserFiltersState>({});
  const [selectedSort, setSelectedSort] = useState<IUserSort>(DEFAULT_SORT);
  const [search, setSearchValue] = useState("");
  const [filterPopoverAnchor, setFilterPopoverAnchor] =
    useState<HTMLButtonElement | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const { toast } = useToast();

  const buildUri = (pageNumber: number, pageSize: number) => {
    const params = new URLSearchParams({
      page: String(pageNumber),
      size: String(pageSize),
    });

    if (isDefined(search)) {
      params.set("search", search);
    }
    if (isDefined(selectedFilters.profession)) {
      params.set("profession", selectedFilters.profession!);
    }
    if (isDefined(selectedFilters.city)) {
      params.set("city", selectedFilters.city!);
    }
    if (isDefined(selectedFilters.country)) {
      params.set("country", selectedFilters.country!);
    }
    if (isDefined(selectedFilters.startDate)) {
      params.set("startDate", selectedFilters.startDate!);
    }
    if (isDefined(selectedFilters.endDate)) {
      params.set("endDate", selectedFilters.endDate!);
    }

    if (isDefined(selectedSort)) {
      params.set(
        "sort",
        `${selectedSort.columnName},${selectedSort.direction}`,
      );
    }

    return `/users?${params.toString()}`;
  };

  const getPage = (pageNumber: number, pageSize: number) => {
    const uri = buildUri(pageNumber, pageSize);

    setLoading(true);
    axiosInstance
      .get(uri)
      .then((res: AxiosResponse<IPage<IUser>>) => {
        setUsersPage(res.data.content);
        setPageState((prev) => ({
          ...prev,
          ...res.data,
        }));
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 400);
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

  const getHasFilters = (): boolean => {
    return isDefined(selectedFilters.profession) || isDefined(selectedFilters.city) || isDefined(selectedFilters.country) || isDefined(selectedFilters.startDate) || isDefined(selectedFilters.endDate)
  }

  const deleteAction = (id: number) => {
    axiosInstance
      .delete(`/users/${id}`)
      .then(() => {
        getPage(pageState.number, selectedPageSize);
        toast(`Successfully delete user ${id}`, {
          severity: "success",
          duration: 5000,
        });
      })
      .catch((err) => {
        toast(`Failed to delete user ${id}`, {
          severity: "error",
          duration: 5000,
        });
      });
  };

  const handleCreateModalClose = (save: boolean) => {
    if (save) {
      getPage(0, selectedPageSize);
    }

    setCreateModalOpen(false);
  }

  useEffect(() => {
    getPage(0, selectedPageSize);
  }, [selectedSort, selectedPageSize, selectedFilters, search]);

  return (
    <>
      <div className="flex flex-1 min-h-0 w-full flex-col px-2 pt-1 pb-2">
        <div className="flex justify-between">
          <div className="my-auto">
            <Button suffixIcon={<FaPlus />} onClick={() => setCreateModalOpen(true)}>Create</Button>
          </div>
          <div className="flex gap-5">
            <SearchField searchFunction={setSearchValue} />
            <div className="my-auto">
              <IconButton
                className={`${!!getHasFilters() && "text-secondary"}`}
                icon={<FaFilter />}
                onClick={openFilterPopover}
              />
            </div>
            <Popover
              open={Boolean(filterPopoverAnchor)}
              id="filter-popover"
              anchorEl={filterPopoverAnchor}
              onClose={() => handleFilterPopoverClose(null)}
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
              <div className="max-h-110 w-110 bg-white m-auto p-5">
                <UserFilters
                  userFilters={selectedFilters}
                  setUserFilters={handleFilterPopoverClose}
                />
              </div>
            </Popover>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto border-2 border-solid border-gray-400 rounded-sm">
          {loading || usersPage === null ? (
            <div className="flex h-full items-center justify-center">
              <CircularProgress size={80} />
            </div>
          ) : (
            <Table
              page={usersPage}
              sort={selectedSort}
              setSort={setSelectedSort}
              deleteAction={deleteAction}
            />
          )}
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
      <CreateUserModal open={createModalOpen} onClose={handleCreateModalClose}/>
    </>
  );
}
