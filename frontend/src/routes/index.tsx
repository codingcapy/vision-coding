import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "/logo_alpha.png";
import { AnimatedText } from "../components/AnimatedText";
import { BsCpu, BsCpuFill } from "react-icons/bs";
import { FaJira, FaNetworkWired } from "react-icons/fa6";
import { VscChecklist } from "react-icons/vsc";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [count, setCount] = useState(0);

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
        <AnimatedText id="description2">
          <div className="mb-3 md:mb-0 rounded-xl border border-[#505050] bg-[#222222] p-5 hover:border-blue-500 transition-all ease-in-out duration-300">
            <div className="text-xl font-bold mb-5 flex items-center">
              <BsCpu />
              <div className="ml-2">Solid CS Foundation</div>
            </div>
            <div>
              Discrete mathematics, data structures and algorithms, computer
              architecture, data communications and networking
            </div>
          </div>
        </AnimatedText>
        <AnimatedText id="description3">
          <div className="mb-3 md:mb-0 rounded-xl border border-[#505050] bg-[#222222] p-5 hover:border-blue-500 transition-all ease-in-out duration-300">
            <div className="text-xl font-bold mb-5 flex items-center">
              <FaNetworkWired />
              <div className="ml-2">Build Real Applications</div>
            </div>
            <div>
              Databases, servers, clients, learn modern ways to build scalable,
              secure apps and deploy them to the real world
            </div>
          </div>
        </AnimatedText>
        <AnimatedText id="description4">
          <div className="mb-3 md:mb-0 rounded-xl border border-[#505050] bg-[#222222] p-5 hover:border-blue-500 transition-all ease-in-out duration-300">
            <div className="text-xl font-bold mb-5 flex items-center">
              <VscChecklist />
              <div className="ml-2">Coding Best Practices</div>
            </div>
            <div>
              Learn to write readable, maintainable code as well as concise
              documentation in any language
            </div>
          </div>
        </AnimatedText>
        <AnimatedText id="description5">
          <div className="mb-3 md:mb-0 rounded-xl border border-[#505050] bg-[#222222] p-5 hover:border-blue-500 transition-all ease-in-out duration-300">
            <div className="text-xl font-bold mb-5 flex items-center">
              <FaJira />
              <div className="ml-2">Project Management</div>
            </div>
            <div>
              Learn tools used by real-world professionals including Git,
              Github, Jira, Linear, Trello and Figma
            </div>
          </div>
        </AnimatedText>
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
            <div className="border rounded-xl border-[#505050] bg-[#222222] p-5 mb-3 md:mb-0 hover:border-blue-500 transition-all ease-in-out duration-300">
              <div className="text-xl font-bold text-[#cccccc] mb-2">
                STAGE 1
              </div>
              <div className="text-lg font-bold text-yellow-500 mb-2">
                Programming Fundamentals
              </div>
              <ul className="list-disc pl-5">
                <li>Data types and data structures</li>
                <li>Variables and constants</li>
                <li>Control flow and iterations</li>
                <li>Functions and recursions</li>
                <li>Classes and objects</li>
                <li>Inheritance and polymorphism</li>
                <li>Computer architecture</li>
                <li>Memory and algorithms</li>
                <li>Git and version control</li>
              </ul>
            </div>
            <div className="border rounded-xl border-[#505050] bg-[#222222] p-5 mb-3 md:mb-0 hover:border-blue-500 transition-all ease-in-out duration-300">
              <div className="text-xl font-bold text-[#cccccc] mb-2">
                STAGE 2
              </div>
              <div className="text-lg font-bold text-yellow-500 mb-2">
                Front-End Development
              </div>
              <ul className="list-disc pl-5">
                <li>HTML and CSS</li>
                <li>JavaScript</li>
                <li>UX/UI and Figma</li>
                <li>React.js and TypeScript</li>
                <li>Tailwind CSS and Axios</li>
                <li>Tanstack Router and Query</li>
                <li>Data communications and TCP</li>
              </ul>
            </div>
            <div className="border rounded-xl border-[#505050] bg-[#222222] p-5 mb-3 md:mb-0 hover:border-blue-500 transition-all ease-in-out duration-300">
              <div className="text-xl font-bold text-[#cccccc] mb-2">
                STAGE 3
              </div>
              <div className="text-lg font-bold text-yellow-500 mb-2">
                Back-End Development
              </div>
              <ul className="list-disc pl-5">
                <li>Relational databases and SQL</li>
                <li>Node.js and Express.js</li>
                <li>REST API server building</li>
                <li>Authentication and sessions</li>
                <li>Bun and Hono</li>
                <li>Rate limiting and security</li>
                <li>LRU caching and DB indexing</li>
                <li>Horizontal and vertical scaling</li>
              </ul>
            </div>
            <div className="border rounded-xl border-[#505050] bg-[#222222] p-5 mb-3 md:mb-0 hover:border-blue-500 transition-all ease-in-out duration-300">
              <div className="text-xl font-bold text-[#cccccc] mb-2">
                STAGE 4
              </div>
              <div className="text-lg font-bold text-yellow-500 mb-2">
                Practicum
              </div>
              <ul className="list-disc pl-5">
                <li>Build and deploy full stack applications end-to-end</li>
                <li>Use professional project management tools</li>
                <li>Apply programming best practices</li>
                <li>Debug and optimize performance for scalability</li>
                <li>Ensure enteprise-grade app security</li>
                <li>Implement CI/CD and devOps</li>
              </ul>
            </div>
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
