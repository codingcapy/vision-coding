import { createFileRoute } from "@tanstack/react-router";
import { AnimatedText } from "../../components/AnimatedText";
import { courses } from "../../utils";

export const Route = createFileRoute("/courses/python2")({
  component: RouteComponent,
});

function RouteComponent() {
  const course = courses.find((c) => c.title === "Python II");
  const Icon = course?.icon;

  return (
    <div className="bg-[radial-gradient(circle_500px_at_top_left,#27505d,black)] md:bg-[radial-gradient(circle_900px_at_top_left,#27505d,black)] text-white min-h-screen p-2">
      <div className="max-w-[1200px] mx-auto pt-[100px]">
        <AnimatedText id="heading">
          <div className="text-4xl font-bold text-center mb-10">
            {course?.title}
          </div>
          <div className="text-xl sm:text-2xl mb-5">{course?.description}</div>
          <ul className="list-disc pl-5">
            {course?.topics.map((t) => (
              <li className="my-1">{t}</li>
            ))}
          </ul>
        </AnimatedText>
        <button className="bg-blue-500 px-3 py-2 my-5 rounded-xl font-bold cursor-pointer hover:bg-blue-400 transition-all ease-in-out duration-300">
          Enrol Now
        </button>
      </div>
    </div>
  );
}
