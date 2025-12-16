export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
        <span className="font-semibold text-lg">CursosPro</span>

        <nav className="flex gap-6 text-sm text-gray-600">
          <a className="hover:text-black" href="#">Inicio</a>
          <a className="hover:text-black" href="#">Cursos</a>
          <a className="hover:text-black" href="#">Ingresar</a>
        </nav>
      </div>
    </header>
  );
}
