import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Protected({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect("/login?msg=AUTH_001");
  }

  return <>{children}</>;
}
