"use client"

import { useEffect, useState } from "react"
import { getMyCourses } from "@/services/courses"
import CourseCard from "@/components/courseCard"

export default function DashboardPage() {
  const [courses, setCourses] = useState([])

  // 🔐 PASO 4 – PROTECCIÓN
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      window.location.href = "/login"
    }
  }, [])

  // 📦 CARGA DE CURSOS
  useEffect(() => {
    getMyCourses()
      .then(setCourses)
      .catch(err => {
        console.error("Error cargando cursos", err)
      })
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Mis cursos</h1>

      {courses.length === 0 ? (
        <p className="text-muted-foreground">
          Todavía no estás inscripto en ningún curso.
        </p>
      ) : (
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
      )}
    </div>
  )
}