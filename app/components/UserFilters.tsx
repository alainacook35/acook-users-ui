import { useState, type Dispatch, type SetStateAction } from "react";
import type { IUserFiltersState } from "~/utils/interfaces";
import TextField from "./TextField";
import Button from "./Button";
import DateField from "./DateField";

export default function UserFilters({
  userFilters,
  setUserFilters,
}: {
  userFilters: IUserFiltersState;
  setUserFilters: (filters: IUserFiltersState) => unknown;
}) {
  const [currentFilters, setCurrentFilters] = useState(userFilters);
  return (
    <div>
      <div className="flex justify-between justify-between my-5">
        <div className="my-auto">
          <p>Profession:</p>
        </div>
        <TextField
          className="w-64"
          value={currentFilters?.profession || ""}
          onChange={(value) => {
            setCurrentFilters((prev) => ({
              ...prev,
              profession: value,
            }));
          }}
        />
      </div>
      <div className="flex justify-between my-5">
        <div className="my-auto">
          <p>City:</p>
        </div>
        <TextField
          className="w-64"
          value={currentFilters?.city || ""}
          onChange={(value) => {
            setCurrentFilters((prev) => ({
              ...prev,
              city: value,
            }));
          }}
        />
      </div>
      <div className="flex justify-between my-5">
        <div className="my-auto">
          <p>Country: </p>
        </div>
        <TextField
          className="w-64"
          value={currentFilters?.country || ""}
          onChange={(value) => {
            setCurrentFilters((prev) => ({
              ...prev,
              country: value,
            }));
          }}
        />
      </div>
      <div className="flex justify-between my-5">
        <div className="my-auto">
          <p>Created After: </p>
        </div>
        <DateField
          className="w-64"
          value={currentFilters.startDate || ""}
          onChange={(value) => {
            setCurrentFilters((prev) => ({
              ...prev,
              startDate: value,
            }));
          }}
        />
      </div>
      <div className="flex justify-between my-5">
        <div className="my-auto">
          <p>Created Before: </p>
        </div>
        <DateField
          className="w-64"
          value={currentFilters?.endDate || ""}
          onChange={(value) => {
            setCurrentFilters((prev) => ({
              ...prev,
              endDate: value,
            }));
          }}
        />
      </div>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setUserFilters(currentFilters);
            close();
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
