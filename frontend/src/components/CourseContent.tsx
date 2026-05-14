import { Link, useNavigate } from "@tanstack/react-router";
import { FaArrowLeft } from "react-icons/fa6";
import { AnimatedText } from "./AnimatedText";
import { courses, type Course } from "../lib/utils";
import { useQuery } from "@tanstack/react-query";
import {
  getEnrolmentQueryOptions,
  useCreateEnrolmentMutation,
} from "../lib/api/enrolments";
import useAuthStore from "../store/AuthStore";
import { useState } from "react";

export function CourseContent(props: { course: Course }) {
  const Icon = props.course.icon;
  const {
    data: enrolment,
    isLoading: enrolmentLoading,
    error: enrolmentError,
  } = useQuery(getEnrolmentQueryOptions(props.course.subpath));
  const { user } = useAuthStore();
  const [notification, setNotification] = useState("");
  const {
    mutate: createEnrolment,
    isPending: createEnrolmentPending,
    error: createEnrolmentError,
  } = useCreateEnrolmentMutation();
  const navigate = useNavigate();

  function handleSubmit() {
    if (!user) return navigate({ to: "/login" });
    if (createEnrolmentPending || enrolment) return;
    createEnrolment(
      {
        course: props.course.subpath,
      },
      {
        onSuccess: () =>
          setNotification("You have successfully enrolled into this course!"),
      },
    );
  }

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
          onClick={handleSubmit}
          disabled={!!user && (!!enrolment || createEnrolmentPending)}
          className={`${user && (enrolment || createEnrolmentPending) ? "bg-[#626262] cursor-not-allowed" : "bg-blue-500 cursor-pointer hover:bg-blue-400"} px-3 py-2 my-5 rounded-xl font-bold text-2xl transition-all ease-in-out duration-300`}
        >
          {user
            ? enrolmentLoading
              ? "Loading..."
              : createEnrolmentPending
                ? "Enrolling..."
                : enrolment
                  ? "Enrolled"
                  : "Enrol Now"
            : "Enrol Now"}
        </button>
        {enrolment && (
          <div>
            Go to your{" "}
            <Link to="/profile" className="text-blue-400 underline">
              profile
            </Link>{" "}
            to view your courses.
          </div>
        )}
      </AnimatedText>
    </div>
  );
}
