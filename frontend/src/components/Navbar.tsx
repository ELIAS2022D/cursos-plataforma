'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          CursosPro
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/" className="text-gray-600 hover:text-indigo-600">
            Inicio
          </Link>
          <Link href="/nosotros" className="text-gray-600 hover:text-indigo-600">
            Nosotros
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Ingresar
          </Link>
        </div>
      </div>
    </nav>
  );
}
