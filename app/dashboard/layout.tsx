"use client";
import React from "react";
import MainMenu from "./components/main-menu";
import MenuTitle from "./components/menu-title";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MenuIcon } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function Layout({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery("(min-width: 768px)");

  return (
    <div className="grid md:grid-cols-[250px_1fr] h-screen">
      {/* globalNav */}
      <MainMenu className="hidden md:flex" />

      {/* mobile Nav Controller */}
      {!isMobile && (
        <div className=" md:hidden flex justify-between p-4 top-0 border-border border-b">
          <MenuTitle />
          <Drawer direction="right">
            {/* 트리거 */}
            <DrawerTrigger>
              <MenuIcon />
            </DrawerTrigger>

            {/* 콘텐츠 */}
            <DrawerContent>
              <DrawerHeader className="sr-only">
                <DrawerTitle>Menu</DrawerTitle> {/* 제목 추가 */}
                <DrawerDescription>...</DrawerDescription>
              </DrawerHeader>
              <MainMenu />
            </DrawerContent>
          </Drawer>
        </div>
      )}

      <div className="overflow-auto py-2 px-4">
        <h1 className="pb-4">Welcome!</h1>
        <div>{children}</div>
      </div>
    </div>
  );
}
