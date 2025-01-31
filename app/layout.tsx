import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";

const montserrat = localFont({
  src: "../public/fonts/Montserrat-VariableFont_wght.woff2",
  variable: "--font-montserrat",
});

const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cn("dark")} ${montserrat.variable}  ${
          pretendard.variable
        }  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
