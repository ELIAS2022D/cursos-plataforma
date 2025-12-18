import { getCourses } from "@/services/courses"
import CourseCard from "@/components/courses/CourseCard"

export default async function CoursesPage() {
  const courses = await getCourses()

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  )
}