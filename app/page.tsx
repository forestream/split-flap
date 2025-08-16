"use client";

import { useState } from "react";
import SplitFlap from "./SplitFlap";

export default function Page() {
  const [value, setValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full flex-wrap gap-4">
        {Array.from({ length: Math.max(3, value.length) }).map((_, index) => (
          <SplitFlap key={index} value={value[index] || ""} />
        ))}
      </div>
      <input
        className="border"
        type="text"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
