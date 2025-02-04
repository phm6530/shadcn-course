import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import MenuItem from "./menu-item";
import MenuTitle from "./menu-title";
import Link from "next/link";
import ThemeToggle from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

const paths: { label: string; href: string }[] = [
  {
    label: "My dashboard",
    href: "/dashboard",
  },
  {
    label: "Teams",
    href: "/temas",
  },
  {
    label: "Teams",
    href: "/temas",
  },
];

export default function MainMenu({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "  h-screen dark:bg-zinc-900 p-4 flex flex-col bg-zinc-100",
        className
      )}
    >
      <div className="border-b dark:border-b-black border-zinc-300 pb-4">
        <MenuTitle />
      </div>

      <div className="pt-4 flex flex-col gap-2">
        {paths.map((path, idx) => {
          return (
            <MenuItem key={idx} href={path.href}>
              {path.label}
            </MenuItem>
          );
        })}
      </div>

      <div className="flex p-4 mt-auto items-center gap-3">
        <Avatar>
          <AvatarFallback className="bg-pink-300 dark:bg-pink-800">
            TP
          </AvatarFallback>
        </Avatar>
        <Link href={""} className="hover:underline">
          logout
        </Link>
        <ThemeToggle className="ml-auto" />
      </div>
    </div>
  );
}
