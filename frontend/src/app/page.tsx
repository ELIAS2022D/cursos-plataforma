'use client';

import { useEffect, useState } from 'react';
import api from '@/services/api';

export default function HomePage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCourses() {
      try {
        const res = await api.get('/courses');
        setCourses(res.data);
      } catch (error) {
        console.error('Error cargando cursos', error);
      } finally {
        setLoading(false);
      }
    }

    getCourses();
  }, []);

  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="text-center py-20 bg-gray-50">
        <h1 className="text-4xl font-bold mb-4">
          Aprendé habilidades reales
        </h1>
        <p className="text-gray-600">
          Cursos diseñados para llevarte al siguiente nivel
        </p>
      </section>

      {/* CURSOS */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6">
          Nuestros Cursos
        </h2>

        {loading ? (
          <p className="text-gray-500">Cargando cursos...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map((course: any) => (
              <div
                key={course._id}
                className="border p-4 rounded-lg shadow hover:shadow-md transition"
              >
                <h3 className="font-bold text-lg">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {course.description}
                </p>
                <p className="mt-3 font-semibold text-indigo-600">
                  ${course.price}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
