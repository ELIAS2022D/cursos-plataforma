type Course = {
  title: string;
  description: string;
  price: number;
};

export default function CourseCard({ course }: { course: Course }) {
  return (
    <div className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
      <h3 className="text-lg font-semibold group-hover:text-blue-600 transition">
        {course.title}
      </h3>

      <p className="mt-3 text-gray-600 text-sm leading-relaxed">
        {course.description}
      </p>

      <div className="mt-6 flex items-center justify-between">
        <span className="font-semibold">
          ${course.price}
        </span>

        <button className="text-sm text-blue-600 hover:underline">
          Ver detalles →
        </button>
      </div>
    </div>
  );
}
