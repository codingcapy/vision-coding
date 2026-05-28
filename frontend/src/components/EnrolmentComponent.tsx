import { useEffect, useRef, useState } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { MdModeEditOutline } from "react-icons/md";
import { courses, MONTHS, YEARS } from "../lib/utils";
import { PiCaretDownBold } from "react-icons/pi";
import { useUpdateEnrolmentMutation } from "../lib/api/enrolments";
import { format } from "date-fns";
import { DayPicker, type MonthChangeEventHandler } from "react-day-picker";

const STATUSES = ["pending", "active", "completed", "cancelled"] as const;
type DropdownMode = "none" | "status" | "course" | "startedAt" | "endedAt";

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
  const [progressContent, setProgressContent] = useState(props.e.progress);
  const [statusContent, setStatusContent] = useState(props.e.status);
  const [courseContent, setCourseContent] = useState(props.e.course);
  const [dropdownMode, setDropdownMode] = useState<DropdownMode>("none");
  const menuRef = useRef<HTMLDivElement | null>(null);
  const {
    mutate: updateEnrolment,
    isPending: updateEnrolmentPending,
    error: updateEnrolmentError,
  } = useUpdateEnrolmentMutation();
  const [startMonth, setStartMonth] = useState<Date | null>(
    props.e.startedAt ? new Date(props.e.startedAt) : null,
  );
  const [endMonth, setEndMonth] = useState<Date | null>(
    props.e.endedAt ? new Date(props.e.endedAt) : null,
  );
  const [startDate, setStartDate] = useState<Date | null>(
    props.e.startedAt ? new Date(props.e.startedAt) : null,
  );
  const [endDate, setEndDate] = useState<Date | null>(
    props.e.endedAt ? new Date(props.e.endedAt) : null,
  );

  function handleStartMonthDropdown(e: React.ChangeEvent<HTMLSelectElement>) {
    const newMonth = startMonth ? new Date(startMonth) : new Date();
    newMonth.setMonth(parseInt(e.target.value));
    setStartMonth(newMonth);
  }

  function handleStartYearDropdown(e: React.ChangeEvent<HTMLSelectElement>) {
    const newMonth = startMonth ? new Date(startMonth) : new Date();
    newMonth.setFullYear(parseInt(e.target.value));
    setStartMonth(newMonth);
  }

  function handleEndMonthDropdown(e: React.ChangeEvent<HTMLSelectElement>) {
    const newMonth = endMonth ? new Date(endMonth) : new Date();
    newMonth.setMonth(parseInt(e.target.value));
    setEndMonth(newMonth);
  }

  function handleEndYearDropdown(e: React.ChangeEvent<HTMLSelectElement>) {
    const newMonth = endMonth ? new Date(endMonth) : new Date();
    newMonth.setFullYear(parseInt(e.target.value));
    setEndMonth(newMonth);
  }

  function handleSubmit() {
    if (updateEnrolmentPending) return;
    updateEnrolment(
      {
        enrolmentId: props.e.enrolmentId,
        status: statusContent,
        course: courseContent,
        progress: progressContent,
        startedAt: startDate,
        endedAt: endDate,
      },
      {
        onSuccess: () => {
          setAdminMode(false);
        },
      },
    );
  }

  function handleClickOutside(event: MouseEvent) {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setDropdownMode("none");
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div>
      {adminMode ? (
        <div className="relative flex my-2" ref={menuRef}>
          <div className="w-[30px]">{props.e.enrolmentId}</div>
          <div className="w-[170px]">{props.e.createdAt.slice(0, 19)}</div>
          <div
            onClick={() => setDropdownMode("status")}
            className="flex items-center justify-center w-[92px] mr-2 border text-center cursor-pointer"
          >
            <div>{statusContent}</div>
            <PiCaretDownBold />
          </div>
          <div className="w-[100px] mr-2 overflow-x-auto">
            {props.e.username}
          </div>
          <div className="w-[100px] mr-2 overflow-x-auto">{props.e.email}</div>
          <div
            onClick={() => {
              setDropdownMode("course");
            }}
            className="flex items-center justify-center w-[92px] border text-center mr-2 cursor-pointer"
          >
            <div>{courseContent}</div>
            <PiCaretDownBold />
          </div>
          <input
            type="number"
            className="w-[100px] mr-2 overflow-x-auto border px-1"
            name="progress"
            id="progress"
            value={progressContent}
            onChange={(e) => setProgressContent(Number(e.target.value))}
            required
          />
          <div
            onClick={() => setDropdownMode("startedAt")}
            className="w-[162px] border text-center mr-2 cursor-pointer line-clamp-1"
          >
            {startDate && startDate.toISOString().slice(0, 10)}
          </div>
          <div
            onClick={() => setDropdownMode("endedAt")}
            className="w-[162px] border text-center mr-2 cursor-pointer line-clamp-1"
          >
            {endDate && endDate.toISOString().slice(0, 10)}
          </div>
          <button
            onClick={handleSubmit}
            className="w-[35px] cursor-pointer text-green-500 flex items-center justify-center"
          >
            <FaCheck />
          </button>
          <div
            onClick={() => setAdminMode(false)}
            className="cursor-pointer text-red-500 flex items-center justify-center"
          >
            <FaXmark />
          </div>
          {dropdownMode === "status" && (
            <div className="absolute top-10 left-[200px] bg-[#222222] border text-center">
              {STATUSES.map((s) => (
                <div
                  onClick={() => {
                    setStatusContent(s);
                    setDropdownMode("none");
                  }}
                  key={s}
                  className="w-[90px] cursor-pointer py-1"
                >
                  {s}
                </div>
              ))}
            </div>
          )}
          {dropdownMode === "course" && (
            <div className="absolute top-10 left-[516px] bg-[#222222] border text-center">
              {courses.map((s) => (
                <div
                  key={s.title}
                  onClick={() => {
                    setCourseContent(s.subpath);
                    setDropdownMode("none");
                  }}
                  className="w-[90px] cursor-pointer py-1"
                >
                  {s.subpath}
                </div>
              ))}
            </div>
          )}
          {dropdownMode === "startedAt" && (
            <div className="absolute top-12 right-[235px] bg-[#333333] p-2">
              <div className="bg-[#404040] p-2">
                <div className="flex justify-between items-center gap-1 px-1 pb-2">
                  <select
                    value={
                      startMonth ? startMonth.getMonth() : new Date().getMonth()
                    }
                    onChange={handleStartMonthDropdown}
                    className="bg-[#555555] text-white text-xs rounded px-1 py-0.5 cursor-pointer"
                  >
                    {MONTHS.map((month, i) => (
                      <option key={month} value={i}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    value={
                      startMonth
                        ? startMonth.getFullYear()
                        : new Date().getFullYear()
                    }
                    onChange={handleStartYearDropdown}
                    className="bg-[#555555] text-white text-xs rounded px-1 py-0.5 cursor-pointer"
                  >
                    {YEARS.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <DayPicker
                  mode="single"
                  selected={startDate ? startDate : new Date()}
                  month={startMonth ? startMonth : new Date()}
                  onMonthChange={setStartMonth as MonthChangeEventHandler}
                  onSelect={(date) => {
                    setStartDate(date || new Date());
                    setDropdownMode("none");
                  }}
                  classNames={{
                    months: "w-full",
                    month: "w-full",
                    month_grid: "w-full",
                  }}
                />
              </div>
            </div>
          )}
          {dropdownMode === "endedAt" && (
            <div className="absolute top-12 right-[65px] bg-[#333333] p-2">
              <div className="bg-[#404040] p-2">
                <div className="flex justify-between items-center gap-1 px-1 pb-2">
                  <select
                    value={
                      endMonth ? endMonth.getMonth() : new Date().getMonth()
                    }
                    onChange={handleEndMonthDropdown}
                    className="bg-[#555555] text-white text-xs rounded px-1 py-0.5 cursor-pointer"
                  >
                    {MONTHS.map((month, i) => (
                      <option key={month} value={i}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    value={
                      endMonth
                        ? endMonth.getFullYear()
                        : new Date().getFullYear()
                    }
                    onChange={handleEndYearDropdown}
                    className="bg-[#555555] text-white text-xs rounded px-1 py-0.5 cursor-pointer"
                  >
                    {YEARS.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <DayPicker
                  mode="single"
                  selected={endDate ? endDate : new Date()}
                  month={endMonth ? endMonth : new Date()}
                  onMonthChange={setEndMonth as MonthChangeEventHandler}
                  onSelect={(date) => {
                    setEndDate(date || new Date());
                    setDropdownMode("none");
                  }}
                  classNames={{
                    months: "w-full",
                    month: "w-full",
                    month_grid: "w-full",
                  }}
                />
              </div>
            </div>
          )}
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
