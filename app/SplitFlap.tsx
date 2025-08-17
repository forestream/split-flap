"use client";

import { ComponentProps, useCallback, useState } from "react";
import { AnimatedFlap } from "@/types";
import SplitFlapAnimated from "./SplitFlapAnimated";
import SplitFlapStyle from "./_components/SplitFlapStyle";
import SplitFlapContainer from "./_components/SplitFlapContainer";
import SplitFlapStatic from "./_components/SplitFlapStatic";
import SplitFlapHalf from "./_components/SplitFlapHalf";

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
    <SplitFlapContainer className={className} {...props}>
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
      <SplitFlapStyle />
      {animatedFlapQueue.map((animatedFlap) => (
        <SplitFlapAnimated key={animatedFlap.id}>
          <SplitFlapHalf
            position="top"
            style={{ zIndex: animatedFlap.zIndex + 1000 }}
            className="rotate-x-180 animate-[flap-current_.5s_ease-in-out] items-center justify-center overflow-hidden rounded bg-slate-900 text-white transition-transform duration-1000 backface-hidden"
          >
            <span className="inline-block translate-y-1/4 text-[100px] font-bold">
              {animatedFlap.current}
            </span>
          </SplitFlapHalf>
          <SplitFlapHalf
            position="bottom"
            style={{ zIndex: 1000 - animatedFlap.zIndex }}
            className="rotate-x-0 animate-[flap-next_.5s_ease-in-out] items-center justify-center overflow-hidden rounded bg-slate-900 text-white transition-transform duration-1000 backface-hidden"
            onAnimationEnd={handleAnimationEnd}
          >
            <span className="inline-block -translate-y-1/4 text-[100px] font-bold">
              {animatedFlap.next}
            </span>
          </SplitFlapHalf>
        </SplitFlapAnimated>
      ))}
      <div className="opacity-0">
        <div className="inline-block text-[100px] font-bold">{current}</div>
      </div>
    </SplitFlapContainer>
  );
}
