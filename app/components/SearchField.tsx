import { useState, type Dispatch, type SetStateAction } from "react";

export default function SearchField({
  searchFunction,
  setSearchValue,
  searchValue
}: {
  searchFunction: () => any;
  setSearchValue: (searchValue: string) => any;
  searchValue: string;
}) {
  
  return (
    <input
      placeholder="Search"
      value={searchValue}
      onChange={(e) => {
        setSearchValue(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          searchFunction();
        }
      }}
    />
  );
}
