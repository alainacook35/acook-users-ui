import type { IUser, IUserSort } from "~/utils/interfaces";
import TableHeaderWithSort from "./TableHeaderWithSort";
import type { SetStateAction, Dispatch } from "react";
import IconButton from "./IconButton";
import { FaTrash } from "react-icons/fa";

const COLUMNS: {
  columnName: keyof IUser;
  label: string;
  styleClasses?: string | undefined;
}[] = [
  {
    columnName: "id",
    label: "ID",
    styleClasses: "w-24",
  },
  {
    columnName: "firstName",
    label: "First Name",
    styleClasses: "max-w-48",
  },
  {
    columnName: "lastName",
    label: "Last Name",
    styleClasses: "max-w-48",
  },
  {
    columnName: "email",
    label: "Email",
    styleClasses: "max-w-80",
  },
  {
    columnName: "profession",
    label: "Profession",
    styleClasses: "max-w-48",
  },
  {
    columnName: "city",
    label: "City",
    styleClasses: "max-w-48",
  },
  {
    columnName: "country",
    label: "Country",
    styleClasses: "max-w-48",
  },
  {
    columnName: "dateCreated",
    label: "Date Created",
    styleClasses: "max-w-48",
  },
];

export default function Table({
  page,
  sort,
  setSort,
  deleteAction,
}: {
  page: IUser[];
  sort: IUserSort;
  setSort: Dispatch<SetStateAction<IUserSort>>;
  deleteAction: (id: number) => unknown;
}) {
  return (
    <div className="w-full">
      <table className="w-full table-fixed">
        <tr className="table-header bg-secondary sticky top-0 text-white text-left">
          {COLUMNS.map(({ columnName, label, styleClasses }) => (
            <TableHeaderWithSort
              key={columnName}
              columnName={columnName}
              currentSort={sort}
              setSort={setSort}
              styleClasses={styleClasses}
            >
              {label}
            </TableHeaderWithSort>
          ))}
          {/* Actions Column*/}
          <th className="w-24"></th>
        </tr>
        <tbody>
          {page.map((user, index) => {
            return (
              <tr
                className={`table-row-${index} odd:bg-gray-100 even:bg-(--color-surface) transition-colors duration-200 hover:bg-gray-200`}
              >
                <td className="max-w-24 truncate">{user.id}</td>
                <td className="max-w-48 truncate">{user.firstName}</td>
                <td className="max-w-48 truncate">{user.lastName}</td>
                <td className="max-w-80 truncate">{user.email}</td>
                <td className="max-w-48 truncate">{user.profession}</td>
                <td className="max-w-48 truncate">{user.city}</td>
                <td className="max-w-48 truncate">{user.country}</td>
                <td className="max-w-48 truncate">{user.dateCreated}</td>
                <td className="w-24">
                  <IconButton
                    className="text-primary hover:text-secondary transition-colors duration-200"
                    icon={<FaTrash />}
                    onClick={() => {
                      deleteAction(user.id);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
