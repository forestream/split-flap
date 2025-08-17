"use client";

import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import SplitFlapHalf from "./SplitFlapHalf";

const positions = {
  top: "rotate-x-180 animate-[flap-current_.5s_ease-in-out]",
  bottom: "rotate-x-0 animate-[flap-next_.5s_ease-in-out]",
};

export default function SplitFlapHalfAnimated({
  position,
  className,
  ...props
}: ComponentProps<typeof SplitFlapHalf>) {
  return (
    <SplitFlapHalf
      position={position}
      className={twMerge(
        clsx("backface-hidden", positions[position], className),
      )}
      {...props}
    />
  );
}
