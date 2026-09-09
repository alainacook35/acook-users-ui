export interface SelectOption<T> {
  label: string;
  value: T;
}

export default function Select<T>({
  options,
  selectedOption,
  setSelected,
  id = "select-page-number",
}: {
  options: SelectOption<T>[];
  selectedOption: T;
  setSelected: (selected: T) => void;
  id?: string;
}) {
  const selectedIndex = options.findIndex((opt) => opt.value === selectedOption);

  return (
    <div className="my-1 mx-1">
      <select
        id={id}
        className="rounded-sm p-1 border-2 border-solid border-primary"
        value={selectedIndex}
        onChange={(e) => setSelected(options[Number(e.target.value)].value)}
      >
        {options.map((opt, index) => (
          <option key={index} value={index}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
