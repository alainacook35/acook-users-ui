import type { IUserPageState } from "~/utils/interfaces";
import IconButton from "./IconButton";
import {
  FaChevronRight,
  FaChevronLeft,
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
} from "react-icons/fa";
import type { Dispatch, SetStateAction } from "react";
import Select from "./Select";

export default function Pagination({
  paginationState,
  getPage,
  selectedPageSize,
  setSelectedPageSize,
}: {
  selectedPageSize: number;
  setSelectedPageSize: (pageCount: number) => unknown;
  paginationState: IUserPageState;
  getPage: (pageNumber: number, pageSize: number) => unknown;
}) {
  const getNextPage = () => {
    if (!!paginationState.empty || !!paginationState.last) {
      return;
    }

    getPage(paginationState.number + 1, selectedPageSize);
  };

  const getPreviousPage = () => {
    if (!!paginationState.empty || !!paginationState.first) {
      return;
    }

    getPage(paginationState.number - 1, selectedPageSize);
  };

  const getFirstPage = () => {
    if (!!paginationState.empty || !!paginationState.first) {
      return;
    }

    getPage(0, selectedPageSize);
  };

  const getLastPage = () => {
    if (!!paginationState.empty || !!paginationState.last || paginationState.totalPages === undefined) {
      return;
    }

    getPage(paginationState.totalPages - 1, selectedPageSize);
  };

  return (
    <div className="justify-between width-full flex">
      <div className="my-auto mx-1">
        <p>
          Page {paginationState.number + 1} of {paginationState.totalPages || "?"}
        </p>
      </div>
      <div className="flex">
        <Select
          selected={selectedPageSize}
          setSelected={setSelectedPageSize}
          options={[5, 10, 20, 50]}
        />
        <IconButton
          className="first-page-btn"
          disabled={!!paginationState.empty || !!paginationState.first}
          icon={<FaAngleDoubleLeft />}
          onClick={getFirstPage}
        />
        <IconButton
          className="previous-page-btn"
          disabled={!!paginationState.empty || !!paginationState.first}
          icon={<FaChevronLeft />}
          onClick={getPreviousPage}
        />
        <IconButton
          className="next-page-btn"
          disabled={!!paginationState.empty || !!paginationState.last}
          icon={<FaChevronRight />}
          onClick={getNextPage}
        />
        <IconButton
          className="last-page-btn"
          disabled={!!paginationState.empty || !!paginationState.last}
          icon={<FaAngleDoubleRight />}
          onClick={getLastPage}
        />
      </div>
    </div>
  );
}
