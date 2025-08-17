"use client";

import { AnimatedFlap } from "@/types";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const SplitFlapContext = createContext<{
  classNames?: {
    flap: string;
  };
  prev: string | null;
  current: string;
  animatedFlapQueue: AnimatedFlap[];
  dequeueAnimatedFlap: () => void;
  handleAnimationEnd: () => void;
  value: string;
} | null>(null);

export function useSplitFlap() {
  const context = useContext(SplitFlapContext);
  if (!context) {
    throw new Error("useSplitFlap must be used within a SplitFlap");
  }
  return context;
}

export function SplitFlap({
  children,
  value,
  classNames,
}: {
  children: React.ReactNode;
  value: string;
  classNames?: {
    flap: string;
  };
}) {
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
      prev,
      current,
      animatedFlapQueue,
      dequeueAnimatedFlap,
      handleAnimationEnd,
      value,
    }),
    [
      classNames,
      prev,
      current,
      animatedFlapQueue,
      dequeueAnimatedFlap,
      handleAnimationEnd,
      value,
    ],
  );

  return (
    <SplitFlapContext.Provider value={contextValue}>
      {children}
    </SplitFlapContext.Provider>
  );
}
