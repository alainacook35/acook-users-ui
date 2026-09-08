import type { ComponentPropsWithoutRef, ReactNode } from "react";

type IconButtonProps = ComponentPropsWithoutRef<"button"> & {
  icon: ReactNode;
};

export default function IconButton({ icon, className, ...rest }: IconButtonProps) {
  return (
    <button className={`rounded-full p-2 ${className ?? ""}`} {...rest}>
      {icon}
    </button>
  );
}
