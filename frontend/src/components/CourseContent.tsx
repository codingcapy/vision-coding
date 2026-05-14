import { Link } from "@tanstack/react-router";
import { FaArrowLeft } from "react-icons/fa6";
import { AnimatedText } from "./AnimatedText";
import { courses, type Course } from "../lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getEnrolmentQueryOptions } from "../lib/api/enrolments";
import useAuthStore from "../store/AuthStore";

export function CourseContent(props: { course: Course }) {
  const Icon = props.course.icon;
  const {
    data: enrolment,
    isLoading: enrolmentLoading,
    error: enrolmentError,
  } = useQuery(getEnrolmentQueryOptions(props.course.subpath));
  const { user } = useAuthStore();

  return (
    <div className="max-w-[1200px] mx-auto pt-[70px] sm:pt-[100px]">
      <Link
        to="/courses/all"
        className="hover:text-blue-500 transition-all ease-in-out duration-300"
      >
        <FaArrowLeft />
      </Link>
      <AnimatedText id="heading">
        <div className="text-4xl font-bold text-center mb-10">
          {props.course.title}
        </div>
        <div className="text-xl sm:text-2xl mb-5">
          {props.course.description}
        </div>
        <div className="sm:flex">
          <ul className="list-disc pl-5">
            {props.course.topics.map((t) => (
              <li key={t} className="my-1">
                {t}
              </li>
            ))}
          </ul>
          <div className="hidden sm:block sm:ml-50">
            <Icon size={200} />
          </div>
        </div>
        <button
          className={`${user && enrolment ? "bg-[#626262]" : "bg-blue-500"} px-3 py-2 my-5 rounded-xl font-bold text-2xl cursor-pointer hover:bg-blue-400 transition-all ease-in-out duration-300`}
        >
          {user
            ? enrolmentLoading
              ? "Loading..."
              : enrolment
                ? "Enrolled"
                : "Enrol Now"
            : "Enrol Now"}
        </button>
      </AnimatedText>
    </div>
  );
}
