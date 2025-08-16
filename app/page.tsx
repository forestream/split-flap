"use client";

import { useEffect, useRef, useState } from "react";
import SplitFlap from "./SplitFlap";

export default function Page() {
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  const [value, setValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    interval.current = setInterval(() => {
      const now = new Date();
      const locale = now.toLocaleTimeString();
      // const milliseconds = now.getMilliseconds();
      // setValue(`${locale}:${milliseconds.toString().padStart(3, "0")}`);
      setValue(locale);
    }, 50);

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full flex-wrap justify-center gap-4">
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
