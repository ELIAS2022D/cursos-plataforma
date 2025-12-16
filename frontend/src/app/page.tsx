import CourseCard from "@/components/courseCard"

const mockCourses = [
  {
    id: 1,
    title: "Fullstack Web",
    description: "Aprendé a crear aplicaciones web modernas",
    price: 120,
  },
  {
    id: 2,
    title: "Backend con Node",
    description: "APIs robustas con NestJS y MongoDB",
    price: 90,
  },
  {
    id: 3,
    title: "Frontend Profesional",
    description: "React, Next.js y buenas prácticas",
    price: 100,
  },
]

export default function HomePage() {
  return (
    <div className="space-y-24">
      {/* HERO */}
      <section className="space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">
          Aprendé habilidades que generan valor real
        </h1>
        <p className="max-w-2xl text-muted-foreground text-lg">
          Formación práctica, clara y enfocada en resultados reales
          para el mercado actual.
        </p>
      </section>

      {/* CURSOS */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Nuestros cursos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockCourses.map(course => (
            <CourseCard
              key={course.id}
              title={course.title}
              description={course.description}
              price={course.price}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
