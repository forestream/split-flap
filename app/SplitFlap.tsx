"use client";

import clsx from "clsx";
import { useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";
import { AnimatedFlap } from "@/types";
import SplitFlapAnimated from "./SplitFlapAnimated";

const classNames = {
  topFlap: "absolute top-0 h-1/2 origin-bottom overflow-hidden",
  bottomFlap: "absolute bottom-0 h-1/2 origin-top overflow-hidden",
  font: "text-[100px] font-bold inline-block",
};

export default function SplitFlap({ list }: { list: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = list[currentIndex];
  const next = list[currentIndex + 1] || list[0];
  const [prev, setPrev] = useState<string | null>(null);

  const [animatedFlapQueue, setAnimatedFlapQueue] = useState<AnimatedFlap[]>(
    [],
  );

  const enqueueAnimatedFlap = useCallback((animatedFlap: AnimatedFlap) => {
    if (!animatedFlap.next) return;
    setAnimatedFlapQueue((prev) => [...prev, animatedFlap]);
  }, []);

  const dequeueAnimatedFlap = useCallback(() => {
    setAnimatedFlapQueue((prev) => {
      const newQueue = prev.slice(1);
      setPrev(prev[1]?.current || null);
      return newQueue;
    });
  }, []);

  const handleClick = () => {
    enqueueAnimatedFlap({ current, next, zIndex: list.length - currentIndex });
    setCurrentIndex((prev) => (prev + 1 >= list.length ? 0 : prev + 1));
    if (prev === null) {
      setPrev(current);
    }
  };

  const handleAnimationEnd = useCallback(() => {
    dequeueAnimatedFlap();
  }, [dequeueAnimatedFlap]);

  return (
    <>
      <div aria-label="split flap container" className="relative w-28 border">
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
              {animatedFlapQueue.slice(-1)[0]?.next || current}
            </span>
          </div>
          <div className={twMerge(clsx(classNames.bottomFlap))}>
            <span
              className={twMerge(clsx(classNames.font, "-translate-y-1/2"))}
            >
              {prev || current}
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
            key={`${animatedFlap.current}-${animatedFlap.next}`}
            animatedFlap={animatedFlap}
            handleAnimationEnd={handleAnimationEnd}
          />
        ))}
        <div className="opacity-0">
          <div className="inline-block text-[100px] font-bold">{current}</div>
        </div>
      </div>
      <button
        className="cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white"
        type="button"
        onClick={handleClick}
      >
        Flap
      </button>
    </>
  );
}
