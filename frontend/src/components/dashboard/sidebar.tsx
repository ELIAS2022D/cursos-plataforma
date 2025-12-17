import Link from "next/link"

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-card px-6 py-8 space-y-8">
      <div className="text-xl font-bold">
        Cursos
      </div>

      <nav className="space-y-4 text-sm">
        <Link href="/dashboard" className="block text-muted-foreground hover:text-foreground">
          Mis cursos
        </Link>

        <Link href="/dashboard/profile" className="block text-muted-foreground hover:text-foreground">
          Perfil
        </Link>

        <Link href="/logout" className="block text-muted-foreground hover:text-foreground">
          Cerrar sesión
        </Link>
      </nav>
    </aside>
  )
}
