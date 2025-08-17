import clsx from "clsx";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export default function SplitFlapContainer({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      aria-label="split flap container"
      className={twMerge(
        clsx("relative min-h-[100px] min-w-[100px] shadow-lg", className),
      )}
      {...props}
    />
  );
}
