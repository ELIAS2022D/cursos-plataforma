import { getCourses } from "@/services/courses"
import CourseCard from "@/components/courseCard"

export default async function HomePage() {
  const courses = await getCourses()

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
          {courses.map((course: any) => (
            <CourseCard
              key={course._id}
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