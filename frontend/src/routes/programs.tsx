import { createFileRoute } from "@tanstack/react-router";
import { AnimatedText } from "../components/AnimatedText";
import type { IconType } from "react-icons/lib";
import { FaNodeJs, FaPython, FaReact } from "react-icons/fa6";
import { ProgramThumbnail } from "../components/ProgramThumbnail";
import { MdOutlineComputer } from "react-icons/md";

export type Program = {
  title: string;
  description: string;
  icon: IconType;
  subpath: "python" | "frontend" | "backend" | "fullstack";
};

export const Route = createFileRoute("/programs")({
  component: RouteComponent,
});

function RouteComponent() {
  const programs: Program[] = [
    {
      title: "Python",
      description:
        "Beginner-friendly programming and computer science fundamentals",
      icon: FaPython,
      subpath: "python",
    },
    {
      title: "Front End",
      description: "Learn HTML, CSS, JavaScript, React and TypeScript",
      icon: FaReact,
      subpath: "frontend",
    },
    {
      title: "Back End",
      description:
        "Learn Databases, Node.js, Express.js, REST API servers, Bun and Hono",
      icon: FaNodeJs,
      subpath: "backend",
    },
    {
      title: "Full Stack",
      description: "Become a professional-level full stack developer",
      icon: MdOutlineComputer,
      subpath: "fullstack",
    },
  ];

  return (
    <div className="bg-[radial-gradient(circle_500px_at_top_left,#27505d,black)] md:bg-[radial-gradient(circle_900px_at_top_left,#27505d,black)] text-white min-h-screen p-2 md:p-0">
      <div className="max-w-[1200px] mx-auto pt-[100px] text-center">
        <AnimatedText id="heading">
          <div className="text-4xl font-bold mb-10">Programs</div>
          {programs.map((p) => (
            <ProgramThumbnail key={p.title} program={p} />
          ))}
        </AnimatedText>
      </div>
    </div>
  );
}
