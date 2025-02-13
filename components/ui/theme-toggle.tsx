"use client";

import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { MoonIcon, SunIcon } from "lucide-react";

export default function ThemeToggle({ className }: { className?: string }) {
  const [mode, setMode] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "dark";
  });
  console.log(mode);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          onClick={() => {
            setMode((prev) => !prev);
            document.body.classList.toggle("dark", mode);
          }}
        >
          {mode ? <SunIcon /> : <MoonIcon />}
        </TooltipTrigger>
        <TooltipContent>
          <p>{mode ? "다크모드 입니다" : "라이트 모드"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
