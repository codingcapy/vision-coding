import type { IconType } from "react-icons/lib";
import { FaPython } from "react-icons/fa6";
import { FaJs } from "react-icons/fa6";
import { FaReact, FaNetworkWired, FaNodeJs } from "react-icons/fa6";
import { BsCpu } from "react-icons/bs";
import { SiBun } from "react-icons/si";
import { MdOutlineComputer } from "react-icons/md";

export type Course = {
  title: string;
  icon: IconType;
  description: string;
  category: "fundamentals" | "frontend" | "backend" | "fullstack";
  topics: string[];
  subpath:
    | "python1"
    | "python2"
    | "frontend1"
    | "frontend2"
    | "backend1"
    | "backend2"
    | "comparch"
    | "datacomm"
    | "practicum";
};

export const courses: Course[] = [
  {
    title: "Python I",
    icon: FaPython,
    description:
      "For complete beginners. Start here if you are new to programming.",
    category: "fundamentals",
    topics: [
      "Data types",
      "Comparison operators",
      "Computational algebra",
      "Variables and constants",
      "Control flows",
      "Lists and dictionaries",
      "Iterations and loops",
      "Functions",
    ],
    subpath: "python1",
  },
  {
    title: "Python II",
    icon: FaPython,
    description:
      "For intermediate programmers. Build web servers and 2D games.",
    category: "fundamentals",
    topics: [
      "Object-Oriented Programming - Classes and objects",
      "Inheritance and polymorphism",
      "Networking basics - servers, clients, databases",
      "Introduction to Flask",
      "Introduction to Django",
      "2D RPG game development with pygame",
      "2D platform game development with pygame",
      "Git and version control",
      "Data structures - arrays, arraylists, linked lists, maps",
      "Algorithms - search, sort, trees, graphs",
    ],
    subpath: "python2",
  },
  {
    title: "Computer Architecture",
    icon: BsCpu,
    description:
      "For programmers who want to solidify computer science fundamentals.",
    category: "fundamentals",
    topics: [
      "Digital Logic - logic gates, register, ALU",
      "Microarchitecture - Data busses, decoder, registers",
      "Cache",
      "Hamming distance and parity bit",
      "Disc reading calculations",
      "Multiplexing",
      "Assembly",
    ],
    subpath: "comparch",
  },
  {
    title: "Frontend I",
    icon: FaJs,
    description:
      "Introduction to web development with HTML, CSS and JavaScript",
    category: "frontend",
    topics: [
      "HTML and CSS",
      "CSS flexbox and grid",
      "SCSS and SASS",
      "JavaScript - variables and constants",
      "JavaScript - arrays, maps, tuples, sets",
      "JavaScript - control flows, loops",
      "JavaScript - functions, classes and objects",
      "UX/UI and Figma",
    ],
    subpath: "frontend1",
  },
  {
    title: "Frontend II",
    icon: FaReact,
    description: "Front-end development with React.js",
    category: "frontend",
    topics: [
      "Introduction to React.js and Babel",
      "Introduction to CRA and Vite",
      "React.js components and functions",
      "React.js useState and useEffect hooks",
      "State management with Redux and Zustand",
      "API layer with Axios and JWT",
      "API layer with TanStack Router and Query",
    ],
    subpath: "frontend2",
  },
  {
    title: "Data Communications",
    icon: FaNetworkWired,
    description: "For programmers wanting to solidify networking fundamentals",
    category: "frontend",
    topics: [
      "Physical layer - analog and digital data",
      "Physical layer - impairments and collisions",
      "Data link layer - Framing and MAC ID",
      "Data link layer - Error handling and flags",
      "Network layer - IP headers and packets",
      "Network layer - Error handling, CRC and checksum",
      "Transport layer - Ports, buffers",
    ],
    subpath: "datacomm",
  },
  {
    title: "Backend I",
    icon: FaNodeJs,
    description: "Build REST API web servers",
    category: "backend",
    topics: [
      "Relational database design and SQL",
      "Callback functions",
      "Node.js and Express.js",
      "API routes",
      "Controller functions",
      "Authentication and authorization",
    ],
    subpath: "backend1",
  },
  {
    title: "Backend II",
    icon: SiBun,
    description:
      "Build production-grade web servers optimized for scalability, reliability and security",
    category: "backend",
    topics: [
      "Bun and Hono",
      "Security optimizations - Rate limiting, encryption, session management, securing endpoints",
      "Scalability optimizations - DB indexing, caching, horizontal scaling, queuing",
      "AI workflows, MCP tools",
    ],
    subpath: "backend2",
  },
  {
    title: "Practicum",
    icon: MdOutlineComputer,
    description:
      "For advanced programmers preparing for jobs or looking to upgrade their skillset",
    category: "fullstack",
    topics: [
      "Full stack development",
      "Agile project management",
      "CI/CD and DevOps",
      "Leetcode, DSA and algorithms",
      "Systems design",
    ],
    subpath: "practicum",
  },
];

export const coursesMap = new Map<string, string>([
  ["datacomm", "Data Communications"],
  ["comparch", "Computer Architecture"],
  ["python1", "Python I"],
  ["python2", "Python II"],
  ["frontend1", "Frontend I"],
  ["frontend2", "Frontend II"],
  ["backend1", "Backend I"],
  ["backend2", "Backend II"],
  ["practicum", "Practicum"],
]);
