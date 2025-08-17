"use client";

import {
  ComponentProps,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { AnimatedFlap } from "@/types";
import SplitFlapAnimated from "./SplitFlapAnimated";
import SplitFlapContainer from "./_components/SplitFlapContainer";
import SplitFlapStatic from "./_components/SplitFlapStatic";
import SplitFlapHalf from "./_components/SplitFlapHalf";
import SplitFlapHalfAnimated from "./_components/SplitFlapHalfAnimated";

const SplitFlapContext = createContext<{
  classNames?: {
    flap: string;
  };
} | null>(null);

export function useSplitFlap() {
  const context = useContext(SplitFlapContext);
  if (!context) {
    throw new Error("useSplitFlap must be used within a SplitFlap");
  }
  return context;
}

interface SplitFlapProps extends ComponentProps<"div"> {
  value?: string;
  classNames?: {
    flap: string;
  };
}

export default function SplitFlap({ value = "", classNames }: SplitFlapProps) {
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

  const contextValue = useMemo(
    () => ({
      classNames,
    }),
    [classNames],
  );

  return (
    <SplitFlapContext.Provider value={contextValue}>
      <SplitFlapContainer>
        <SplitFlapStatic>
          <SplitFlapHalf position="top">
            <span className="inline-block translate-y-1/4 text-[100px] font-bold">
              {animatedFlapQueue.length ? value : current}
            </span>
          </SplitFlapHalf>
          <SplitFlapHalf position="bottom">
            <span className="inline-block -translate-y-1/4 text-[100px] font-bold">
              {animatedFlapQueue.length ? prev : current}
            </span>
          </SplitFlapHalf>
        </SplitFlapStatic>
        {animatedFlapQueue.map((animatedFlap) => (
          <SplitFlapAnimated key={animatedFlap.id}>
            <SplitFlapHalfAnimated
              position="top"
              style={{ zIndex: animatedFlap.zIndex + 1000 }}
            >
              <span className="inline-block translate-y-1/4 text-[100px] font-bold">
                {animatedFlap.current}
              </span>
            </SplitFlapHalfAnimated>
            <SplitFlapHalfAnimated
              position="bottom"
              style={{ zIndex: 1000 - animatedFlap.zIndex }}
              onAnimationEnd={handleAnimationEnd}
            >
              <span className="inline-block -translate-y-1/4 text-[100px] font-bold">
                {animatedFlap.next}
              </span>
            </SplitFlapHalfAnimated>
          </SplitFlapAnimated>
        ))}
        <div className="opacity-0">
          <div className="inline-block text-[100px] font-bold">{current}</div>
        </div>
      </SplitFlapContainer>
    </SplitFlapContext.Provider>
  );
}
