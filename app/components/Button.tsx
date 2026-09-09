import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  suffixIcon?: ReactNode;
};

export default function Button({
  suffixIcon,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button className={`rounded-md py-2 px-5 bg-primary text-white transition-colors duration-400 hover:bg-(--color-primary-lighter) ${className ?? ""}`} {...rest}>
      <div className="flex gap-2">
        {children}
        <div className="my-auto">{suffixIcon}</div>
      </div>
    </button>
  );
}
