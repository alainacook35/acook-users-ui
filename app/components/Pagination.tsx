import type { IPaginationState } from "~/utils/interfaces";
import IconButton from "./IconButton";
import {
  FaChevronRight,
  FaChevronLeft,
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
} from "react-icons/fa";
import Select from "./Select";

export default function Pagination({
  paginationState,
  getPage,
  selectedPageSize,
  setSelectedPageSize,
}: {
  selectedPageSize: number;
  setSelectedPageSize: (pageCount: number) => void;
  paginationState: IPaginationState;
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
    if (
      !!paginationState.empty ||
      !!paginationState.last ||
      paginationState.totalPages === undefined
    ) {
      return;
    }

    getPage(paginationState.totalPages - 1, selectedPageSize);
  };

  return (
    <div className="justify-between width-full flex mt-2">
      <div className="my-auto mx-1">
        <p>
          Page {paginationState.number + 1} of{" "}
          {paginationState.totalPages || "?"}
        </p>
      </div>
      <div className="flex">
        <Select
          selectedOption={selectedPageSize}
          setSelected={setSelectedPageSize}
          options={[5, 10, 20, 50].map((opt) => ({
            label: String(opt),
            value: opt,
          }))}
        />
        <div className="flex my-auto">
          <IconButton
            title="Go to first page"
            className="first-page-btn text-primary transition-colors duration-200 hover:bg-gray-100 disabled:text-gray-300 disabled:bg-transparent"
            disabled={!!paginationState.empty || !!paginationState.first}
            icon={<FaAngleDoubleLeft />}
            onClick={getFirstPage}
          />
          <IconButton
            title="Go to previous page"
            className="previous-page-btn text-primary transition-colors duration-200 hover:bg-gray-100 disabled:text-gray-300 disabled:bg-transparent"
            disabled={!!paginationState.empty || !!paginationState.first}
            icon={<FaChevronLeft />}
            onClick={getPreviousPage}
          />
          <IconButton
            title="Go to next page"
            className="next-page-btn text-primary transition-colors duration-200 hover:bg-gray-100 disabled:text-gray-300 disabled:bg-transparent"
            disabled={!!paginationState.empty || !!paginationState.last}
            icon={<FaChevronRight />}
            onClick={getNextPage}
          />
          <IconButton
            title="Go to last page"
            className="last-page-btn text-primary transition-colors duration-200 hover:bg-gray-100 disabled:text-gray-300 disabled:bg-transparent"
            disabled={!!paginationState.empty || !!paginationState.last}
            icon={<FaAngleDoubleRight />}
            onClick={getLastPage}
          />
        </div>
      </div>
    </div>
  );
}
