import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatedText } from "../components/AnimatedText";
import useAuthStore from "../store/AuthStore";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getEnrolmentsInfiniteQueryOptions } from "../lib/api/enrolments";
import { coursesMap } from "../lib/utils";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { useUpdatePasswordMutation } from "../lib/api/users";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const {
    data: enrolmentsData,
    isLoading: enrolmentsLoading,
    error: enrolmentsError,
    fetchNextPage: fetchNextEnrolmentsPage,
    hasNextPage: hasNextEnrolmentsPage,
    isFetchingNextPage: isFetchingNextEnrolmentsPage,
  } = useInfiniteQuery({
    ...getEnrolmentsInfiniteQueryOptions(),
  });
  const enrolments = enrolmentsData?.pages.flatMap((p) => p.enrolments);
  const enrolmentsSentinelRef = useRef<HTMLDivElement | null>(null);
  const [editPasswordMode, setEditPasswordMode] = useState(false);
  const { mutate: updatePassword, isPending: updatePasswordPending } =
    useUpdatePasswordMutation();
  const [passwordNotification, setPasswordNotification] = useState("");

  const fetchNextEnrolmentsPageCallback = useCallback(() => {
    if (hasNextEnrolmentsPage && !isFetchingNextEnrolmentsPage) {
      fetchNextEnrolmentsPage();
    }
  }, [
    hasNextEnrolmentsPage,
    isFetchingNextEnrolmentsPage,
    fetchNextEnrolmentsPage,
  ]);
  function handleSubmitUpdatePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (updatePasswordPending) return;
    const currentPassword = (e.target as HTMLFormElement).currentPassword.value;
    const password = (e.target as HTMLFormElement).password.value;
    if (password.length < 8) {
      setPasswordNotification("New password must be at least 8 characters.");
      return;
    }
    updatePassword(
      { currentPassword, password },
      {
        onSuccess: () => {
          setEditPasswordMode(false);
          setPasswordNotification("Success!");
        },
        onError: (errorMessage) =>
          setPasswordNotification(errorMessage.message),
      },
    );
  }

  useEffect(() => {
    const sentinel = enrolmentsSentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextEnrolmentsPageCallback();
      },
      { threshold: 0.1 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchNextEnrolmentsPageCallback]);

  useEffect(() => {
    if (!user) navigate({ to: "/" });
  }, [user]);

  return (
    <div className="bg-[radial-gradient(circle_500px_at_top_left,#27505d,black)] md:bg-[radial-gradient(circle_900px_at_top_left,#27505d,black)] text-white min-h-screen p-2">
      <div className="max-w-[1200px] mx-auto pt-[100px]">
        <AnimatedText id="heading">
          <div className="text-4xl font-bold text-center mb-5">
            Your Profile
          </div>
          {user && (
            <div className="sm:w-[500px] mx-auto mb-10">
              <div className="flex">
                <div className="w-[150px] sm:w-[250px]">username:</div>
                <div>{user.username}</div>
              </div>
              <div className="flex">
                <div className="w-[150px] sm:w-[250px]">email:</div>
                <div>{user.email}</div>
              </div>
              <div className="flex">
                <div className="w-[150px] sm:w-[250px]">password:</div>
                {editPasswordMode ? (
                  <form onSubmit={handleSubmitUpdatePassword} className="flex">
                    <input
                      type="password"
                      name="currentPassword"
                      id="currentPassword"
                      placeholder="Current"
                      className="sm:w-[130px] border rounded px-1 mr-1"
                      required
                    />
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="New"
                      className="sm:w-[130px] border rounded px-1"
                      required
                    />
                    <button className="w-[35px] cursor-pointer text-green-500 flex items-center justify-center">
                      <FaCheck />
                    </button>
                    <div
                      onClick={() => setEditPasswordMode(false)}
                      className="cursor-pointer text-red-500 flex items-center justify-center"
                    >
                      <FaXmark />
                    </div>
                  </form>
                ) : (
                  <div className="flex">
                    <div>●●●●●●●●●●●●</div>
                    <div
                      onClick={() => setEditPasswordMode(true)}
                      className="ml-2 border rounded px-2 cursor-pointer hover:text-blue-500 transition-all ease-in-out duration-300"
                    >
                      Change
                    </div>
                  </div>
                )}
              </div>
              <div className="flex">
                <div className="w-[150px] sm:w-[250px]"></div>
                <div
                  className={
                    passwordNotification === "Success!"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {passwordNotification}
                </div>
              </div>
            </div>
          )}
        </AnimatedText>
        <AnimatedText id="heading2">
          <div className="text-4xl font-bold text-center mb-10">
            Your Courses
          </div>
        </AnimatedText>
        {enrolmentsLoading ? (
          <div>Loading enrolments...</div>
        ) : enrolmentsError ? (
          <div>Error loading enrolments</div>
        ) : enrolments ? (
          <>
            {enrolments.map((e) => (
              <AnimatedText key={e.enrolmentId} id={e.enrolmentId.toString()}>
                <div className="flex flex-col border rounded p-5 bg-[#222222] mb-3 sm:mb-0 hover:border-blue-500 transition-all ease-in-out duration-300 my-3 sm:w-[500px] mx-auto">
                  <div>{coursesMap.get(e.course)}</div>
                  <div
                    className={`${e.status === "completed" ? "text-green-500" : e.status === "cancelled" ? "text-red-500" : e.status === "active" ? "text-yellow-500" : "italic text-[#8e8e8e]"}`}
                  >
                    {e.status === "active"
                      ? "In progress"
                      : e.status.charAt(0).toUpperCase() + e.status.slice(1)}
                  </div>
                  {e.status !== "pending" && (
                    <div>
                      Start date:{" "}
                      {e.startedAt && e.startedAt.toString().slice(0, 10)}
                    </div>
                  )}
                  {e.status === "completed" && (
                    <div>
                      End date: {e.endedAt && e.endedAt.toString().slice(0, 10)}
                    </div>
                  )}
                  {e.status === "active" && (
                    <div>
                      <div>Progress:</div>
                      <div className="flex">
                        <div className="my-1 relative w-[300px] h-[15px] bg-gray-500 rounded-full border">
                          <div
                            className="absolute top-[-5px] left-0 my-1 h-[15px] bg-green-500 rounded-full border"
                            style={{ width: `${e.progress * 3}px` }}
                          ></div>
                        </div>
                        <div className="ml-2">{e.progress}%</div>
                      </div>
                    </div>
                  )}
                </div>
              </AnimatedText>
            ))}
            <div ref={enrolmentsSentinelRef} />
            {isFetchingNextEnrolmentsPage && (
              <div className="py-3 text-sm text-[#a0a0a0]">Loading more...</div>
            )}
          </>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
