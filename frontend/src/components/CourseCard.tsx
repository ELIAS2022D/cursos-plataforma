export default function CourseCard({ course }: any) {
  return (
    <div className="bg-bg-light border border-border-light rounded-lg p-6 hover:shadow-md transition">
      <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
        {course.title}
      </h3>
      <p className="text-text-secondary text-sm mb-4">
        {course.description}
      </p>
      <div className="flex justify-between items-center">
        <span className="font-bold text-accent-blue">
          ${course.price}
        </span>
        <button className="text-accent-blue hover:underline">
          Ver más
        </button>
      </div>
    </div>
  );
}
