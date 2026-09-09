import { useState } from "react";
import IconButton from "./IconButton";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function SearchField({
  searchFunction,
}: {
  searchFunction: (search: string) => unknown;
}) {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="my-5">
      <div className="flex gap-1 rounded-sm p-1 border-2 border-solid border-gray-300 duration-300 ease-in-out hover:border-primary focus-within:border-primary">
        <input
          className="focus:outline-none"
          placeholder="Search name or email"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchFunction(searchValue);
            }
          }}
        />

        <IconButton
          
          icon={<FaMagnifyingGlass />}
          onClick={() => searchFunction(searchValue)}
        />
      </div>
    </div>
  );
}
