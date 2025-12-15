import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 py-24 text-center">
        <h1 className="text-5xl font-bold tracking-tight mb-6">
          Aprendé habilidades que generan valor real
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Formación práctica, clara y enfocada en resultados reales para el mercado actual.
        </p>

        <div className="mt-10">
          <button className="rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800">
            Ver cursos
          </button>
        </div>
      </section>

      {/* CURSOS */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="mb-10 text-3xl font-semibold">Nuestros cursos</h2>

        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold mb-2">Curso {i}</h3>
              <p className="text-sm text-gray-600">
                Descripción breve del curso, clara y directa.
              </p>
              <p className="mt-4 font-bold">$19.999</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
