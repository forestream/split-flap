import { ComponentProps } from "react";
import { SplitFlap as SplitFlapProvider } from "./_components/SplitFlap";
import SplitFlapAnimated from "./_components/SplitFlapAnimatedContainer";
import SplitFlapContainer from "./_components/SplitFlapContainer";
import SplitFlapStatic from "./_components/SplitFlapStatic";
import SplitFlapHalf from "./_components/SplitFlapHalf";
import SplitFlapHalfAnimated from "./_components/SplitFlapHalfAnimated";
import SplitFlapQueue from "./_components/SplitFlapQueue";
import SplitFlapStaticValue from "./_components/SplitFlapStaticValue";

interface SplitFlapProps extends ComponentProps<"div"> {
  value?: string;
}

export default function SplitFlap({ value = "" }: SplitFlapProps) {
  return (
    <SplitFlapProvider value={value}>
      <SplitFlapContainer>
        <SplitFlapStatic>
          <SplitFlapHalf position="top">
            <span className="inline-block translate-y-1/4 text-[100px] font-bold">
              <SplitFlapStaticValue position="top" />
            </span>
          </SplitFlapHalf>
          <SplitFlapHalf position="bottom">
            <span className="inline-block -translate-y-1/4 text-[100px] font-bold">
              <SplitFlapStaticValue position="bottom" />
            </span>
          </SplitFlapHalf>
        </SplitFlapStatic>
        <SplitFlapQueue
          render={({ animatedFlap }) => (
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
              >
                <span className="inline-block -translate-y-1/4 text-[100px] font-bold">
                  {animatedFlap.next}
                </span>
              </SplitFlapHalfAnimated>
            </SplitFlapAnimated>
          )}
        />
        <div className="opacity-0">
          <div className="inline-block text-[100px] font-bold">
            <SplitFlapStaticValue position="top" />
          </div>
        </div>
      </SplitFlapContainer>
    </SplitFlapProvider>
  );
}
