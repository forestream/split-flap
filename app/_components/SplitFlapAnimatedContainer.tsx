"use client";

import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { useSplitFlap } from "./SplitFlap";

export default function SplitFlapAnimatedContainer({
  className,
  ...props
}: ComponentProps<"div">) {
  const { handleAnimationEnd } = useSplitFlap();

  return (
    <div
      aria-label="split flap animated"
      className={twMerge(
        clsx("absolute inset-0 h-full origin-center"),
        className,
      )}
      onAnimationEnd={handleAnimationEnd}
      {...props}
    />
  );
}
