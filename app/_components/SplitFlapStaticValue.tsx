import { useSplitFlap } from "./SplitFlap";

export default function SplitFlapStaticValue({
  position,
}: {
  position: "top" | "bottom";
}) {
  const { animatedFlapQueue, current, value, prev } = useSplitFlap();
  const valueOnAnimation = position === "top" ? value : prev;
  return animatedFlapQueue.length ? valueOnAnimation : current;
}
