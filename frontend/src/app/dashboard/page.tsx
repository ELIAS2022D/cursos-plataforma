import CourseProgressCard from "@/components/dashboard/courseProgressCard"

const mockCourses = [
  {
    id: 1,
    title: "Fullstack Web",
    progress: 35,
  },
  {
    id: 2,
    title: "Backend con Node",
    progress: 80,
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">
          Mi aprendizaje
        </h1>
        <p className="text-muted-foreground">
          Continuá donde lo dejaste
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockCourses.map(course => (
          <CourseProgressCard
            key={course.id}
            title={course.title}
            progress={course.progress}
          />
        ))}
      </section>
    </div>
  )
}
