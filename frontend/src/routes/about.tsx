import { createFileRoute } from "@tanstack/react-router";
import { AnimatedText } from "../components/AnimatedText";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-[radial-gradient(circle_500px_at_top_left,#27505d,black)] md:bg-[radial-gradient(circle_900px_at_top_left,#27505d,black)] text-white min-h-screen p-2 md:p-0">
      <div className="max-w-[1200px] mx-auto pt-[100px] text-center">
        <AnimatedText id="heading">
          <div className="text-4xl md:text-6xl font-bold text-yellow-200 md:mt-[100px] mb-10">
            Shaping Software Engineers
          </div>
          <div className="md:text-2xl max-w-[800px] mx-auto mb-10 md:mb-20">
            Empowering the next generation of engineers through{" "}
            <span className="text-yellow-500">hands-on learning</span> and{" "}
            <span className="text-yellow-500">real-world experience</span>
          </div>
          <div className="md:text-2xl max-w-[800px] mx-auto">
            Vision Coding Academy was founded with a clear purpose: to provide
            knowledge and skills required for computer science and software
            development. Our approach involves passing down industry expertise
            to prepare students for real-world engineering.
          </div>
        </AnimatedText>
      </div>
    </div>
  );
}
