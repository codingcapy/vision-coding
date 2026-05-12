import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "/logo_alpha.png";
import { AnimatedText } from "../components/AnimatedText";
import { BsCpu, BsCpuFill } from "react-icons/bs";
import { FaJira, FaNetworkWired } from "react-icons/fa6";
import { VscChecklist } from "react-icons/vsc";
import type { IconType } from "react-icons/lib";
import { HomeValueCard } from "../components/HomeValueCard";
import { HomeStageCard } from "../components/HomeStageCard";

export type ValueCard = {
  title: string;
  description: string;
  icon: IconType;
};

export type StageCard = {
  title: string;
  description: string;
  topics: string[];
};

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [count, setCount] = useState(0);
  const valueCards: ValueCard[] = [
    {
      title: "Solid CS Foundation",
      description:
        "Discrete mathematics, data structures and algorithms, computer architecture, data communications and networking",
      icon: BsCpu,
    },
    {
      title: "Build Real Applications",
      description:
        "Databases, servers, clients, learn modern ways to build scalable, secure apps and deploy them to the real world",
      icon: FaNetworkWired,
    },
    {
      title: "Coding Best Practices",
      description:
        "Learn to write readable, maintainable code as well as concise documentation in any language",
      icon: VscChecklist,
    },
    {
      title: "Project Management",
      description:
        "Learn tools used by real-world professionals including Git, Github, Jira, Linear, Trello and Figma",
      icon: FaJira,
    },
  ];
  const stageCards: StageCard[] = [
    {
      title: "STAGE 1",
      description: "Programming Fundamentals",
      topics: [
        "Data types and data structures",
        "Variables and constants",
        "Control flow and iterations",
        "Functions and recursions",
        "Classes and objects",
        "Inheritance and polymorphism",
        "Computer architecture",
        "Memory and algorithms",
        "Git and version control",
      ],
    },
    {
      title: "STAGE 2",
      description: "Front-End Development",
      topics: [
        "HTML and CSS",
        "JavaScript",
        "UX/UI and Figma",
        "React.js and TypeScript",
        "Tailwind CSS and Axios",
        "Tanstack Router and Query",
        "Data communications and TCP",
      ],
    },
    {
      title: "STAGE 3",
      description: "Back-End Development",
      topics: [
        "Relational databases and SQL",
        "Node.js and Express.js",
        "REST API server building",
        "Authentication and sessions",
        "Bun and Hono",
        "Rate limiting and security",
        "LRU caching and DB indexing",
        "Horizontal and vertical scaling",
      ],
    },
    {
      title: "STAGE 4",
      description: "Practicum",
      topics: [
        "Build and deploy full stack applications end-to-end",
        "Use professional project management tools",
        "Apply programming best practices",
        "Debug and optimize performance for scalability",
        "Ensure enteprise-grade app security",
        "Implement CI/CD and devOps",
      ],
    },
  ];

  return (
    <div className="bg-[radial-gradient(circle_500px_at_top_left,#27505d,black)] md:bg-[radial-gradient(circle_900px_at_top_left,#27505d,black)] text-white min-h-screen p-2 md:p-0">
      <AnimatedText id="banner">
        <div className="md:flex flex-col pt-[50px]">
          <div className="md:flex md:mx-auto max-w-[1200px]">
            <img
              src={logo}
              alt=""
              className="w-[40%] md:scale-50 shrink-0 mx-auto md:mx-0 self-start"
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
      <AnimatedText id="description1">
        <div className="text-center max-w-[1000px] mx-auto pb-10">
          <div className="w-[100px] mt-10 md:mt-0 mb-10 mx-auto h-[2.5px] bg-linear-to-r from-transparent via-blue-400 to-transparent"></div>
          <div className="text-3xl font-bold mb-5">Why Choose Us</div>
          <div className="text-xl mb-10">
            Not all coding academies are created equal. At Vision, we don't just
            teach code — we solidify computer science and engineering
            foundations. Our program is designed for individuals who have a
            curiosity for software development and the tech industry.
          </div>
        </div>
      </AnimatedText>
      <div className="md:grid grid-cols-2 gap-10 max-w-[1200px] mx-auto mb-10 md:mb-20">
        {valueCards.map((c, idx) => (
          <HomeValueCard key={c.title} valueCard={valueCards[idx]} />
        ))}
      </div>
      <AnimatedText id="description6">
        <div className="max-w-[1200px] mx-auto mb-10">
          <div className="text-center text-3xl font-bold mb-5">The Journey</div>
          <div className="text-center text-xl mb-10">
            Four carefully designed stages that build upon each other, creating
            lasting skills and confidence. Start at any stage depending on your
            education and experience.
          </div>
          <div className="md:grid grid-cols-4 gap-5">
            {stageCards.map((s) => (
              <HomeStageCard key={s.title} stageCard={s} />
            ))}
          </div>
        </div>
      </AnimatedText>
      <AnimatedText id="description7">
        <div className="mx-auto text-center pb-20">
          <div className="text-3xl font-bold mb-10">
            Ready to build your engineering path?
          </div>
          <Link to="/courses/all">
            <div className="bg-blue-500 rounded-full w-[200px] mx-auto py-3 text-xl font-bold cursor-pointer hover:bg-blue-400 transition-all ease-in-out duration-300">
              GET STARTED
            </div>
          </Link>
        </div>
      </AnimatedText>
    </div>
  );
}
