import CourseCard from "./courseCard";

export default function CoursesSection({ courses }: any) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-heading font-semibold text-text-primary mb-6">
          Nuestros cursos
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {courses.map((c: any) => (
            <CourseCard key={c._id} course={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
