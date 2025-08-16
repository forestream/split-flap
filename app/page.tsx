"use client";

import { useRef, useState } from "react";
import SplitFlap from "./SplitFlap";

export default function Page() {
  const inputQueue = useRef<string[]>(["a", "b", "c", "d", "e", "f", "g"]);
  const [value, setValue] = useState("A");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.slice(-1));
    inputQueue.current.push(e.target.value.slice(-1));
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <SplitFlap list={inputQueue.current} />
      <input
        className="border"
        type="text"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
