import React from "react";
import MainMenu from "./components/main-menu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[250px_1fr]">
      {/* globalNav */}
      <MainMenu />
      <div className="overflow-auto py-2 px-4">
        <h1 className="pb-4">Welcome!</h1>
        <div>{children}</div>
      </div>
    </div>
  );
}
