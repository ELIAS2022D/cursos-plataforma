import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <span className="text-lg font-semibold">CursosPro</span>

        <nav className="flex items-center gap-6 text-sm text-gray-600">
          <Link href="/">Inicio</Link>
          <Link href="/nosotros">Nosotros</Link>
          <Link
            href="/login"
            className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Ingresar
          </Link>
        </nav>
      </div>
    </header>
  );
}
