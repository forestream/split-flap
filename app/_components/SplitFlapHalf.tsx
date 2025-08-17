"use client";

import clsx from "clsx";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
// eslint-disable-next-line import/no-cycle
import { useSplitFlap } from "@/app/SplitFlap";

const positions = {
  top: "-top-0.5 origin-bottom",
  bottom: "-bottom-0.5 origin-top",
};

interface SplitFlapHalfProps extends ComponentProps<"div"> {
  position: keyof typeof positions;
}

export default function SplitFlapHalf({
  className,
  position = "top",
  ...props
}: SplitFlapHalfProps) {
  const { classNames } = useSplitFlap();
  return (
    <div
      aria-label="split flap half"
      className={twMerge(
        clsx(
          "absolute flex h-1/2 w-full items-center justify-center overflow-hidden rounded bg-slate-900 text-white",
          positions[position],
          classNames?.flap,
          className,
        ),
      )}
      {...props}
    />
  );
}
