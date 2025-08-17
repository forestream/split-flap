"use client";

import { AnimatedFlap } from "@/types";
import { useSplitFlap } from "./SplitFlap";

export default function SplitFlapQueue({
  render,
}: {
  render: (props: { animatedFlap: AnimatedFlap }) => React.ReactNode;
}) {
  const { animatedFlapQueue } = useSplitFlap();

  return animatedFlapQueue.map((animatedFlap) => render({ animatedFlap }));
}
