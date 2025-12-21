"use client";

import "./globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="min-h-screen">
          <Navbar />
          <main className="container max-w-7xl py-12">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}