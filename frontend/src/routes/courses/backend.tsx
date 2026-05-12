import { createFileRoute } from "@tanstack/react-router";
import { AnimatedText } from "../../components/AnimatedText";
import { courses } from "../../utils";
import { CourseThumbnail } from "../../components/CourseThumbnail";

export const Route = createFileRoute("/courses/backend")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-[radial-gradient(circle_500px_at_top_left,#27505d,black)] md:bg-[radial-gradient(circle_900px_at_top_left,#27505d,black)] text-white min-h-screen p-2 md:p-0">
      <div className="max-w-[1200px] mx-auto pt-[100px] text-center">
        <AnimatedText id="heading">
          <div className="text-4xl font-bold mb-10">Backend Courses</div>
          <div className="sm:grid sm:grid-cols-3 gap-5">
            {courses
              .filter((c) => c.category === "backend")
              .map((c) => (
                <CourseThumbnail key={c.title} course={c} />
              ))}
          </div>
        </AnimatedText>
      </div>
    </div>
  );
}
