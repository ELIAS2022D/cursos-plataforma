"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  fullName: string;
  email: string;
};

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
    router.refresh();
    window.location.href = "/"
  }

  return (
    <header className="border-b">
      <div className="container max-w-7xl h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="font-bold text-lg">
          Cursos
        </Link>

        {/* MENU */}
        <nav className="flex items-center gap-4">
          <Link href="/nosotros">Nosotros</Link>

          {!user && (
            <>
              <Link href="/login">Ingresar</Link>
              <Button asChild>
                <Link href="/register">Registrarse</Link>
              </Button>
            </>
          )}

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {user.fullName}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                  Dashboard
                </DropdownMenuItem>

                <DropdownMenuItem onClick={logout} className="text-red-500">
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>
      </div>
    </header>
  );
}