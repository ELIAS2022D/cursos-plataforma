import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="container h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg">
          Cursos<span className="text-blue-600">Pro</span>
        </Link>

        <nav className="flex items-center gap-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">Inicio</Link>
          <Link href="/nosotros" className="hover:text-gray-900">Nosotros</Link>
          <Link href="/login" className="hover:text-gray-900">Ingresar</Link>
        </nav>
      </div>
    </header>
  );
}
