export default function Hero() {
  return (
    <section className="pt-28 pb-24">
      <div className="container text-center">
        <span className="inline-block mb-6 text-sm px-4 py-1 rounded-full bg-blue-100 text-blue-700">
          Formación profesional
        </span>

        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-tight">
          Aprendé habilidades que
          <br />
          <span className="text-blue-600">
            generan valor real
          </span>
        </h1>

        <p className="mt-8 text-xl text-gray-600 max-w-2xl mx-auto">
          Cursos claros, prácticos y orientados al mercado laboral actual.
        </p>

        <div className="mt-12 flex justify-center gap-4">
          <button className="px-8 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
            Ver cursos
          </button>

          <button className="px-8 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition">
            Cómo funciona
          </button>
        </div>
      </div>
    </section>
  );
}
