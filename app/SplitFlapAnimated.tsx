import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { memo } from "react";
import { AnimatedFlap } from "@/types";

const classNames = {
  font: "text-[100px] font-bold inline-block",
};

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
          className="absolute top-0 right-0 left-0 h-1/2 origin-bottom rotate-x-180 animate-[flap-current_.5s_ease-in-out] overflow-hidden bg-white transition-transform duration-1000 backface-hidden"
        >
          <span className={twMerge(clsx(classNames.font))}>
            {animatedFlap.current}
          </span>
        </div>
        <div
          style={{ zIndex: 9999 - animatedFlap.zIndex }}
          className="absolute right-0 bottom-0 left-0 h-1/2 origin-top rotate-x-0 animate-[flap-next_.5s_ease-in-out] overflow-hidden bg-white transition-transform duration-1000 backface-hidden"
          onAnimationEnd={handleAnimationEnd}
        >
          <span className={twMerge(clsx(classNames.font, "-translate-y-1/2"))}>
            {animatedFlap.next}
          </span>
        </div>
      </div>
    );
  },
);

export default SplitFlapAnimated;
