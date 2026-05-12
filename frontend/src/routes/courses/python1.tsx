import { createFileRoute, Link } from "@tanstack/react-router";
import { courses } from "../../lib/utils";
import { CourseContent } from "../../components/CourseContent";

export const Route = createFileRoute("/courses/python1")({
  component: RouteComponent,
});

function RouteComponent() {
  const course = courses.find((c) => c.title === "Python I");

  return (
    <div className="bg-[radial-gradient(circle_500px_at_top_left,#27505d,black)] md:bg-[radial-gradient(circle_900px_at_top_left,#27505d,black)] text-white min-h-screen p-2">
      {course && <CourseContent course={course} />}
    </div>
  );
}
