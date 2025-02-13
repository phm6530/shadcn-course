"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function MenuItem({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "p-2 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 rounded-md text-muted-foreground hover:bg-zinc-200",
        pathname === href && "bg-primary hover:bg-primary text-white"
      )}
    >
      {children}
    </Link>
  );
}
