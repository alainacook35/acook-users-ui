import type { ComponentPropsWithoutRef, ReactNode } from "react";

type IconButtonProps = ComponentPropsWithoutRef<"button"> & {
  icon: ReactNode;
};

export default function IconButton({
  icon,
  className,
  ...rest
}: IconButtonProps) {
  return (
    <button className={`rounded-full p-2 text-primary transition-colors duration-200 hover:bg-gray-100 ${className ?? ""}`} {...rest}>
      {icon}
    </button>
  );
}
