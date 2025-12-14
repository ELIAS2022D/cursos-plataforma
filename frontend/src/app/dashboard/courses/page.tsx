'use client';

import { useEffect, useState } from 'react';
import api from '@/services/api';

export default function DashboardCoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.get('/courses').then(res => setCourses(res.data));
  }, []);

  async function buyCourse(courseId: string) {
    await api.post('/orders/buy', { courseId });
    alert('Curso comprado');
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Cursos disponibles
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course: any) => (
          <div
            key={course._id}
            className="border p-4 rounded"
          >
            <h3 className="font-semibold">{course.title}</h3>
            <p>{course.description}</p>
            <p className="font-bold">${course.price}</p>

            <button
              onClick={() => buyCourse(course._id)}
              className="mt-3 bg-black text-white px-4 py-2"
            >
              Comprar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
