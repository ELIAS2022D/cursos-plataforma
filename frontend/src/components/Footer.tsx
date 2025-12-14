export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-gray-500 text-center">
        © {new Date().getFullYear()} CursosPro. Todos los derechos reservados.
      </div>
    </footer>
  );
}
