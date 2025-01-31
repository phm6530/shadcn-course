"use client";

import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { MoonIcon, SunIcon } from "lucide-react";

export default function ThemeToggle() {
  const [mode, setMode] = useState<boolean>(false);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger onClick={() => setMode((prev) => !prev)}>
          {mode ? <MoonIcon /> : <SunIcon />}
        </TooltipTrigger>
        <TooltipContent>
          <p>{mode ? "다크모드 입니다" : "라이트 모드"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
