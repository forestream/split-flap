import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const positions = {
  top: "translate-y-1/4",
  bottom: "-translate-y-1/4",
  static: "",
};

interface SplitFlapSpanProps extends ComponentProps<"span"> {
  position: keyof typeof positions;
}

export default function SplitFlapSpan({
  children,
  position,
  className,
  ...props
}: SplitFlapSpanProps) {
  return (
    <span
      className={twMerge(
        "inline-block text-[100px] font-bold",
        positions[position],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
