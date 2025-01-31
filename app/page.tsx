import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/theme-toggle";
import { PersonStandingIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center p-6 justify-center mb:p24">
      <div className="flex flex-col gap-5">
        <h1 className="flex gap-2 items-center  justify-center">
          <PersonStandingIcon size={40} className="text-pink-500" />
          Suport Me
        </h1>
        <p>
          build dashboards with shadcn ui components, including shadcn ui, tail
        </p>
        <div className="flex items-center gap-3 justify-center">
          {/* as Child은 자신의 스타일을 자식 컴포넌트에게 상속*/}
          <Button asChild className="">
            <Link href="/login">Log in</Link>
          </Button>
          <small>or</small>
          <Button asChild variant="outline">
            <Link href="/sign-up">Sign up</Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </main>
  );
}
