import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import logo from "/logo_alpha.png";
import { AnimatedText } from "../components/AnimatedText";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-[radial-gradient(circle_500px_at_top_left,#27505d,black)] md:bg-[radial-gradient(circle_900px_at_top_left,#27505d,black)] text-white min-h-screen p-2 md:p-0">
      <AnimatedText id="idontknow">
        <div className="md:flex flex-col pt-[50px]">
          <div className="md:flex md:mx-auto max-w-[1200px]">
            <img
              src={logo}
              alt=""
              className="w-[40%] md:scale-50 shrink-0 mx-auto md:mx-0"
            />
            <div className="md:pt-[100px]">
              <div className="px-1 py-3 rounded-full w-[300px] mx-auto md:mx-0 text-center text-xs font-bold border border-blue-500 text-blue-500 bg-[#0406349e] hover:bg-[#0f135b9e] transition-all ease-in-out duration-300">
                PREMIUM COMPUTER SCIENCE EDUCATION
              </div>
              <div className="text-4xl md:text-8xl font-bold text-center md:text-left my-3 md:pb-3">
                <span className="hover:text-yellow-500 transition-all ease-in-out duration-300">
                  Vision
                </span>{" "}
                <span className="hover:text-yellow-500 transition-all ease-in-out duration-300">
                  Coding
                </span>{" "}
                <span className="text-blue-500 hover:text-blue-700 transition-all ease-in-out duration-300">
                  Academy
                </span>
              </div>
              <div className="h-1 w-[80%] mx-auto md:mx-0 mb-3 bg-linear-to-r from-blue-500 to-yellow-500 opacity-80"></div>
              <div className="mb-5 text-center md:text-left text-lg md:text-3xl text-blue-200">
                Coding Education for Future Engineers
              </div>
              <div className="md:flex md:mx-auto text-center list-disc text-blue-500">
                <div className="mx-2">• 95% University Success Rate</div>
                <div className="mx-2">• Industry Expert Instructors </div>
                <div className="mx-2">• Maximum 5 Students Per Class</div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedText>
      <AnimatedText id="idunno2">
        <div className="text-center text-3xl">Why Choose Us</div>
      </AnimatedText>
    </div>
  );
}
