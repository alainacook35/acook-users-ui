export default function DateField({
  value,
  onChange,
  placeholder,
  id,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
}) {
  return (
    <div className="my-5">
      <div className="flex gap-1 rounded-sm p-1 border-2 border-solid border-gray-300 duration-300 ease-in-out hover:border-primary focus-within:border-primary">
        <input
          id={id}
          type="date"
          className="focus:outline-none"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
