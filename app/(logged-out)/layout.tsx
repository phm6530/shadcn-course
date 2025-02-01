import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Public({ children }: { children: ReactNode }) {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col min-h-screen items-center  justify-center mx-2 ">
      {children}
    </div>
  );
}
