import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <header className="border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight"
        >
          CursosPro
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition"
          >
            Inicio
          </Link>

          <Link
            href="/nosotros"
            className="text-sm text-muted-foreground hover:text-foreground transition"
          >
            Nosotros
          </Link>

          <Button asChild variant="outline" size="sm">
            <Link href="/login">Ingresar</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
