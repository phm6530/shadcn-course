import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Public({ children }: { children: ReactNode }) {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return <>{children}</>;
}
