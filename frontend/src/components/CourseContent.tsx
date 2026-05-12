import { Link } from "@tanstack/react-router";
import { FaArrowLeft } from "react-icons/fa6";
import { AnimatedText } from "./AnimatedText";
import { courses, type Course } from "../lib/utils";

export function CourseContent(props: { course: Course }) {
  const Icon = props.course.icon;

  return (
    <div className="max-w-[1200px] mx-auto pt-[70px] sm:pt-[100px]">
      <Link to="/courses/all">
        <FaArrowLeft />
      </Link>
      <AnimatedText id="heading">
        <div className="text-4xl font-bold text-center mb-10">
          {props.course.title}
        </div>
        <div className="text-xl sm:text-2xl mb-5">
          {props.course.description}
        </div>
        <ul className="list-disc pl-5">
          {props.course.topics.map((t) => (
            <li className="my-1">{t}</li>
          ))}
        </ul>
        <button className="bg-blue-500 px-3 py-2 my-5 rounded-xl font-bold cursor-pointer hover:bg-blue-400 transition-all ease-in-out duration-300">
          Enrol Now
        </button>
      </AnimatedText>
    </div>
  );
}
