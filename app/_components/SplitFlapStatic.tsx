import clsx from "clsx";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export default function SplitFlapStatic(props: ComponentProps<"div">) {
  return (
    <div
      aria-label="split flap static"
      className={twMerge(clsx("absolute inset-0 z-0 h-full"))}
      {...props}
    />
  );
}
