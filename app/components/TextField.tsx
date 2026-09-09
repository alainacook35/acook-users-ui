import type { ComponentPropsWithoutRef } from "react";

export default function TextField({
  value,
  onChange,
  className,
  ...inputProps
}: {
  value: string;
  onChange: (value: string) => void;
} & Omit<ComponentPropsWithoutRef<"input">, "value" | "onChange">) {
  return (
    <div className={`flex gap-1 rounded-sm p-1 border-2 border-solid border-gray-300 duration-300 ease-in-out hover:border-primary focus-within:border-primary ${className ?? ""}`}>
      <input
        className={`focus:outline-none w-full`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...inputProps}
      />
    </div>
  );
}
