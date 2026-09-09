import type { ReactNode } from "react";
import type { IUser, IUserSort } from "~/utils/interfaces";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import IconButton from "./IconButton";

export default function TableHeaderWithSort({
  children,
  columnName,
  currentSort,
  setSort,
  styleClasses = ""
}: {
  children: ReactNode;
  columnName: keyof IUser;
  setSort: (sort: IUserSort) => unknown;
  currentSort?: IUserSort;
  styleClasses?: string
}) {
  // Only treat this header as sorted when currentSort points at this column.
  const sort = currentSort?.columnName === columnName ? currentSort : undefined;

  const icon = sort?.direction === "desc" ? <FaCaretDown /> : <FaCaretUp />;

  return (
    <th className={`group pl-[10px] ${styleClasses}`}>
      {children}{" "}
      <IconButton
        icon={icon}
        className={sort ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
        onClick={() => {
          if (sort === undefined) {
            setSort({ columnName, direction: "asc" });
          } else {
            const direction = sort.direction === "asc" ? "desc" : "asc";
            setSort({ columnName, direction });
          }
        }}
      />
    </th>
  );
}
