import styled from "styled-components";

const Input = styled.input({ width: "40px", border: "1px solid gray" })

export default function SearchField({
  searchFunction,
  setSearchValue,
  searchValue,
}: {
  searchFunction: () => any;
  setSearchValue: (searchValue: string) => any;
  searchValue: string;
}) {
  return (
    <div className="my-5">
      <input
        className="rounded-sm p-1 border-2 border-solid border-primary"
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
    </div>
  );
}
