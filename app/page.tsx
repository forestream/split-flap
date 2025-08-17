"use client";

import { useEffect, useRef, useState } from "react";
import SplitFlap from "./SplitFlap";
import SplitFlapKeyframes from "./_components/SplitFlapKeyframes";
import SplitFlapContainer from "./_components/SplitFlapContainer";
import SplitFlapStatic from "./_components/SplitFlapStatic";
import SplitFlapHalf from "./_components/SplitFlapHalf";
import SplitFlapHalfAnimated from "./_components/SplitFlapHalfAnimated";
import SplitFlapQueue from "./_components/SplitFlapQueue";
import SplitFlapStaticValue from "./_components/SplitFlapStaticValue";
import SplitFlapAnimatedContainer from "./_components/SplitFlapAnimatedContainer";
import SplitFlapSpan from "./_components/SplitFlapSpan";

export default function Page() {
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  const [value, setValue] = useState("");

  useEffect(() => {
    interval.current = setInterval(() => {
      const now = new Date();
      const locale = now.toLocaleTimeString();
      const milliseconds = now.getMilliseconds();
      setValue(`${locale}:${milliseconds.toString().padStart(3, "0")}`);
    }, 33);

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full flex-wrap justify-center gap-4">
        <SplitFlapKeyframes />
        {Array.from({ length: value.length }).map((_, index) => (
          <SplitFlap key={index} value={value[index]}>
            <SplitFlapContainer>
              <SplitFlapStatic>
                <SplitFlapHalf position="top">
                  <SplitFlapSpan position="top">
                    <SplitFlapStaticValue position="top" />
                  </SplitFlapSpan>
                </SplitFlapHalf>
                <SplitFlapHalf position="bottom">
                  <SplitFlapSpan position="bottom">
                    <SplitFlapStaticValue position="bottom" />
                  </SplitFlapSpan>
                </SplitFlapHalf>
              </SplitFlapStatic>
              <SplitFlapQueue
                render={({ animatedFlap }) => (
                  <SplitFlapAnimatedContainer key={animatedFlap.id}>
                    <SplitFlapHalfAnimated
                      position="top"
                      style={{ zIndex: animatedFlap.zIndex + 1000 }}
                    >
                      <SplitFlapSpan position="top">
                        {animatedFlap.current}
                      </SplitFlapSpan>
                    </SplitFlapHalfAnimated>
                    <SplitFlapHalfAnimated
                      position="bottom"
                      style={{ zIndex: 1000 - animatedFlap.zIndex }}
                    >
                      <SplitFlapSpan position="bottom">
                        {animatedFlap.next}
                      </SplitFlapSpan>
                    </SplitFlapHalfAnimated>
                  </SplitFlapAnimatedContainer>
                )}
              />
              <div className="opacity-0">
                <SplitFlapSpan position="static">
                  <SplitFlapStaticValue position="top" />
                </SplitFlapSpan>
              </div>
            </SplitFlapContainer>
          </SplitFlap>
        ))}
      </div>
    </div>
  );
}
