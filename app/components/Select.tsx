// Because of time crunch, the forced type of options makes this component not really reusable, fix if time left
export default function Select({
  options,
  selected,
  setSelected,
}: {
  options: number[];
  selected: number;
  setSelected: (selected: number) => void;
}) {
  return (
    <div className="my-1 mx-1">
      <select
        className="rounded-sm p-1 border-2 border-solid border-primary"
        value={selected}
        onChange={(e) => setSelected(Number(e.target.value))}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
