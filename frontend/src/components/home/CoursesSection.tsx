import CourseCard from '../courses/CourseCard';

const courses = [
  {
    title: 'Programación Web',
    description: 'Bases sólidas para crear sitios modernos y profesionales.',
    price: 14999,
  },
  {
    title: 'Backend con Node.js',
    description: 'APIs reales, autenticación y bases de datos.',
    price: 19999,
  },
  {
    title: 'React & Next.js',
    description: 'Frontend moderno usado en productos reales.',
    price: 17999,
  },
];

export default function CoursesSection() {
  return (
    <section className="py-24">
      <div className="container">
        <h2 className="text-3xl font-semibold">
          Cursos disponibles
        </h2>

        <p className="mt-4 text-gray-600 max-w-xl">
          Contenidos pensados para aprender haciendo.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <CourseCard key={i} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
