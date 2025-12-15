export default function Hero() {
  return (
    <section className="bg-bg-light py-24 text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-5xl font-heading font-bold text-text-primary mb-4">
          Formación profesional para el mundo real
        </h1>
        <p className="text-lg text-text-secondary mb-8">
          Cursos prácticos, claros y aplicables, diseñados para ayudarte a crecer.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-accent-blue text-white px-6 py-3 rounded-lg hover:bg-accent-blue-light transition font-semibold">
            Ver cursos
          </button>
          <button className="border border-border-light px-6 py-3 rounded-lg hover:bg-bg-light transition font-semibold">
            Cómo funciona
          </button>
        </div>
      </div>
    </section>
  );
}
