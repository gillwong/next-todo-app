import type { Metadata } from "next";
import { Inter } from "next/font/google";

import NavBar from "@/components/nav/nav-bar";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Todo App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar className="sticky top-0" />
        <main className="px-4 mt-3">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
