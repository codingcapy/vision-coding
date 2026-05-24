import { useState } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { MdModeEditOutline } from "react-icons/md";

export function EnrolmentComponent(props: {
  e: {
    enrolmentId: number;
    userId: string;
    status: "active" | "pending" | "completed" | "cancelled";
    createdAt: string;
    course:
      | "python1"
      | "python2"
      | "frontend1"
      | "frontend2"
      | "backend1"
      | "backend2"
      | "practicum"
      | "datacomm"
      | "comparch";
    startedAt: string | null;
    endedAt: string | null;
    progress: number;
    username: string;
    email: string;
  };
}) {
  const [adminMode, setAdminMode] = useState(false);
  const [statusContent, setStatusContent] = useState(props.e.status);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [courseContent, setCourseContent] = useState(props.e.status);
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);

  return (
    <div>
      {adminMode ? (
        <div className="flex my-2">
          <div className="w-[30px]">{props.e.enrolmentId}</div>
          <div className="w-[170px]">{props.e.createdAt.slice(0, 19)}</div>
          <div className="w-[92px] mr-2 border text-center">
            {props.e.status}
          </div>
          <input
            placeholder={props.e.username}
            className="w-[100px] mr-2 overflow-x-auto border px-1"
            name="username"
            id="username"
          />
          <input
            placeholder={props.e.email}
            className="w-[100px] mr-2 overflow-x-auto border px-1"
            name="email"
            id="email"
          />
          <div className="w-[92px] border text-center mr-2">
            {props.e.course}
          </div>
          <input
            type="number"
            value={props.e.progress}
            className="w-[100px] mr-2 overflow-x-auto border px-1"
            name="progress"
            id="progress"
          />
          <div className="w-[162px] border text-center mr-2">
            {props.e.startedAt && props.e.startedAt.slice(0, 19)}
          </div>
          <div className="w-[162px] border text-center mr-2">
            {props.e.endedAt && props.e.endedAt.slice(0, 19)}
          </div>
          <button className="w-[35px] cursor-pointer text-green-500 flex items-center justify-center">
            <FaCheck />
          </button>
          <div
            onClick={() => setAdminMode(false)}
            className="cursor-pointer text-red-500 flex items-center justify-center"
          >
            <FaXmark />
          </div>
        </div>
      ) : (
        <div key={props.e.enrolmentId} className="flex my-2">
          <div className="w-[30px]">{props.e.enrolmentId}</div>
          <div className="w-[170px]">{props.e.createdAt.slice(0, 19)}</div>
          <div className="w-[100px]">{props.e.status}</div>
          <div className="w-[100px] mr-2 overflow-x-auto">
            {props.e.username}
          </div>
          <div className="w-[100px] mr-2 overflow-x-auto">{props.e.email}</div>
          <div className="w-[100px]">{props.e.course}</div>
          <div className="w-[100px]">{props.e.progress}</div>
          <div className="w-[170px]">
            {props.e.startedAt && props.e.startedAt.slice(0, 19)}
          </div>
          <div className="w-[170px]">
            {props.e.endedAt && props.e.endedAt.slice(0, 19)}
          </div>
          <MdModeEditOutline onClick={() => setAdminMode(true)} />
        </div>
      )}
    </div>
  );
}
