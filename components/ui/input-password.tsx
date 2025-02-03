"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => {
  const [passwordView, setPasswordView] = React.useState<boolean>(false);
  return (
    <div className="relative flex">
      <input
        type={!passwordView ? "password" : "text"}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pr-12",
          className
        )}
        ref={ref}
        {...props}
      />
      <span
        className="absolute right-4  cursor-pointer top-1/2 -translate-y-1/2"
        onMouseDown={(e) => {
          e.preventDefault();
          setPasswordView(true);
        }}
        onMouseUp={() => setPasswordView(false)}
        onMouseLeave={() => setPasswordView(false)}
      >
        {passwordView ? <EyeOffIcon /> : <EyeIcon />}
      </span>
    </div>
  );
});
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
