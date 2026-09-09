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
      <div className="flex justify-between justify-between">
        <p>Profession:</p>
        <TextField
          value={currentFilters?.profession || ""}
          onChange={(value) => {
            setCurrentFilters((prev) => ({
              ...prev,
              profession: value,
            }));
          }}
        />
      </div>
      <div className="flex justify-between">
        <p>City:</p>
        <TextField
          value={currentFilters?.city || ""}
          onChange={(value) => {
            setCurrentFilters((prev) => ({
              ...prev,
              city: value,
            }));
          }}
        />
      </div>
      <div className="flex justify-between">
        <p>Country: </p>
        <TextField
          value={currentFilters?.country || ""}
          onChange={(value) => {
            setCurrentFilters((prev) => ({
              ...prev,
              country: value,
            }));
          }}
        />
      </div>
      <div className="flex justify-between">
        <p>Created After: </p>
        <DateField
          value={currentFilters.startDate || ""}
          onChange={(value) => {
            setCurrentFilters((prev) => ({
              ...prev,
              startDate: value,
            }));
          }}
        />
      </div>
      <div className="flex justify-between">
        <p>Created Before: </p>
        <DateField
          value={currentFilters?.endDate || ""}
          onChange={(value) => {
            setCurrentFilters((prev) => ({
              ...prev,
              endDate: value,
            }));
          }}
        />
      </div>
      <div>
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
