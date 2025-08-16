import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { memo } from "react";
import { AnimatedFlap } from "@/types";

const SplitFlapAnimated = memo(
  ({
    animatedFlap,
    handleAnimationEnd,
  }: {
    animatedFlap: AnimatedFlap;
    handleAnimationEnd: () => void;
  }) => {
    return (
      <div
        aria-label="split flap animated"
        className="absolute inset-0 h-full origin-center overflow-hidden"
      >
        <div
          style={{ zIndex: animatedFlap.zIndex + 100 }}
          className="absolute -top-0.5 right-0 left-0 flex h-1/2 origin-bottom rotate-x-180 animate-[flap-current_.5s_ease-in-out] items-center justify-center overflow-hidden rounded bg-slate-900 text-white transition-transform duration-1000 backface-hidden"
        >
          <span
            className={twMerge(
              clsx("inline-block translate-y-1/4 text-[100px] font-bold"),
            )}
          >
            {animatedFlap.current}
          </span>
        </div>
        <div
          style={{ zIndex: 9999 - animatedFlap.zIndex }}
          className="absolute right-0 -bottom-0.5 left-0 flex h-1/2 origin-top rotate-x-0 animate-[flap-next_.5s_ease-in-out] items-center justify-center overflow-hidden rounded bg-slate-900 text-white transition-transform duration-1000 backface-hidden"
          onAnimationEnd={handleAnimationEnd}
        >
          <span
            className={twMerge(
              clsx("inline-block -translate-y-1/4 text-[100px] font-bold"),
            )}
          >
            {animatedFlap.next}
          </span>
        </div>
      </div>
    );
  },
);

export default SplitFlapAnimated;
