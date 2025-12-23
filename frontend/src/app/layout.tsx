"use client";

import "./globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { AuthProvider, useAuth } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

function LayoutContent({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* 🔑 key fuerza re-render cuando cambia el usuario */}
      <Navbar key={user?.id ?? "guest"} />

      <main className="container max-w-7xl py-12">
        {children}
      </main>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <LayoutContent>{children}</LayoutContent>
        </AuthProvider>
      </body>
    </html>
  );
}