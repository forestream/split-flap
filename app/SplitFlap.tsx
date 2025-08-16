"use client";

import clsx from "clsx";
import { ComponentProps, useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";
import { AnimatedFlap } from "@/types";
import SplitFlapAnimated from "./SplitFlapAnimated";

const classNames = {
  topFlap: "absolute top-0 h-1/2 origin-bottom overflow-hidden",
  bottomFlap: "absolute bottom-0 h-1/2 origin-top overflow-hidden",
  font: "text-[100px] font-bold inline-block",
};

interface SplitFlapProps extends ComponentProps<"div"> {
  value?: string;
}

export default function SplitFlap({
  className,
  value = "",
  ...props
}: SplitFlapProps) {
  const [prev, setPrev] = useState<string | null>(null);
  const [current, setCurrent] = useState<string>("");
  const [animatedFlapQueue, setAnimatedFlapQueue] = useState<AnimatedFlap[]>(
    [],
  );

  const dequeueAnimatedFlap = useCallback(() => {
    setAnimatedFlapQueue((prev) => {
      const newQueue = prev.slice(1);
      return newQueue;
    });
  }, []);

  const handleAnimationEnd = useCallback(() => {
    dequeueAnimatedFlap();
  }, [dequeueAnimatedFlap]);

  if (value !== current) {
    setPrev(current);
    setCurrent(value);
    setAnimatedFlapQueue((queue) => {
      const last = queue.slice(-1)[0];
      return [
        ...queue,
        {
          id: crypto.randomUUID(),
          current,
          next: value,
          zIndex: last?.zIndex ? last.zIndex - 1 : 1000,
        },
      ];
    });
  }

  return (
    <div
      aria-label="split flap container"
      className={twMerge(
        clsx("relative min-h-[100px] w-28 rounded border shadow-md", className),
      )}
      {...props}
    >
      <div
        aria-label="split flap static"
        className={twMerge(
          clsx(
            "absolute inset-0 z-0 h-full overflow-hidden",
            animatedFlapQueue[0],
          ),
        )}
      >
        <div className={twMerge(clsx(classNames.topFlap))}>
          <span className={twMerge(clsx(classNames.font))}>
            {animatedFlapQueue.length ? value : current}
          </span>
        </div>
        <div className={twMerge(clsx(classNames.bottomFlap))}>
          <span className={twMerge(clsx(classNames.font, "-translate-y-1/2"))}>
            {animatedFlapQueue.length ? prev : current}
          </span>
        </div>
      </div>
      <style>
        {`
              @keyframes flap-current {
                0% {
                  transform: rotateX(0deg);
                }
                100% {
                  transform: rotateX(180deg);
                }
              }
              @keyframes flap-next {
                0% {
                  transform: rotateX(-180deg);
                }
                100% {
                  transform: rotateX(0deg);
                }
              }
            `}
      </style>
      {animatedFlapQueue.map((animatedFlap) => (
        <SplitFlapAnimated
          key={animatedFlap.id}
          animatedFlap={animatedFlap}
          handleAnimationEnd={handleAnimationEnd}
        />
      ))}
      <div className="opacity-0">
        <div className="inline-block text-[100px] font-bold">{current}</div>
      </div>
    </div>
  );
}
