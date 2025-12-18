"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getMyCourses } from "@/services/courses"
import CourseCard from "@/components/courses/CourseCard"

export default function DashboardPage() {
  const [courses, setCourses] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) router.push("/login")
  }, [router])

  useEffect(() => {
    getMyCourses()
      .then(setCourses)
      .catch(console.error)
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">
        Mis cursos
      </h1>

      {courses.length === 0 ? (
        <p className="text-muted-foreground">
          Todavía no compraste ningún curso.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((enrollment: any) => (
            <CourseCard
              key={enrollment._id}
              id={enrollment.courseId._id}
              title={enrollment.courseId.title}
              description={enrollment.courseId.description}
              price={enrollment.courseId.price}
              purchased
            />
          ))}
        </div>
      )}
    </div>
  )
}