import { createFileRoute } from "@tanstack/react-router";
import { AnimatedText } from "../../components/AnimatedText";
import { courses } from "../../lib/utils";
import { CourseThumbnail } from "../../components/CourseThumbnail";

export const Route = createFileRoute("/courses/all")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-[radial-gradient(circle_500px_at_top_left,#27505d,black)] md:bg-[radial-gradient(circle_900px_at_top_left,#27505d,black)] text-white min-h-screen p-2">
      <div className="max-w-[1200px] mx-auto pt-[100px]">
        <AnimatedText id="heading">
          <div className="text-4xl font-bold text-center mb-10">
            All Courses
          </div>
          <div className="sm:grid sm:grid-cols-3 2xl:grid-cols-4 gap-5">
            {courses.map((c) => (
              <CourseThumbnail key={c.title} course={c} />
            ))}
          </div>
        </AnimatedText>
      </div>
    </div>
  );
}
