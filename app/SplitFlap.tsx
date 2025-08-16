"use client";

import clsx from "clsx";
import { ComponentProps, useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";
import { AnimatedFlap } from "@/types";
import SplitFlapAnimated from "./SplitFlapAnimated";

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
        clsx("relative min-h-[100px] w-28 shadow-md", className),
      )}
      {...props}
    >
      <div
        aria-label="split flap static"
        className={twMerge(
          clsx("absolute inset-0 z-0 h-full", animatedFlapQueue[0]),
        )}
      >
        <div
          aria-label="split flap flap"
          className={twMerge(
            clsx(
              "absolute -top-0.5 flex h-1/2 w-full origin-bottom items-center justify-center overflow-hidden rounded bg-slate-900 text-white",
            ),
          )}
        >
          <span
            className={twMerge(
              clsx("inline-block translate-y-1/4 text-[100px] font-bold"),
            )}
          >
            {animatedFlapQueue.length ? value : current}
          </span>
        </div>
        <div
          aria-label="split flap flap"
          className={twMerge(
            clsx(
              "absolute -bottom-0.5 flex h-1/2 w-full origin-top items-center justify-center overflow-hidden rounded bg-slate-900 text-white",
            ),
          )}
        >
          <span
            className={twMerge(
              clsx("inline-block -translate-y-1/4 text-[100px] font-bold"),
            )}
          >
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
