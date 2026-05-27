import { useInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { getAdminEnrolmentsInfiniteQueryOptions } from "../lib/api/enrolments";
import { useCallback, useEffect, useRef } from "react";
import useAuthStore from "../store/AuthStore";
import { MdModeEditOutline } from "react-icons/md";
import { EnrolmentComponent } from "../components/EnrolmentComponent";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const { user } = useAuthStore();
  const {
    data: enrolmentsData,
    isLoading: enrolmentsLoading,
    error: enrolmentsError,
    fetchNextPage: fetchNextEnrolmentsPage,
    hasNextPage: hasNextEnrolmentsPage,
    isFetchingNextPage: isFetchingNextEnrolmentsPage,
  } = useInfiniteQuery({
    ...getAdminEnrolmentsInfiniteQueryOptions(),
  });
  const enrolments = enrolmentsData?.pages.flatMap((p) => p.enrolments);
  const enrolmentsSentinelRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const fetchNextEnrolmentsPageCallback = useCallback(() => {
    if (hasNextEnrolmentsPage && !isFetchingNextEnrolmentsPage) {
      fetchNextEnrolmentsPage();
    }
  }, [
    hasNextEnrolmentsPage,
    isFetchingNextEnrolmentsPage,
    fetchNextEnrolmentsPage,
  ]);

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
    if (user && user.role !== "admin") navigate({ to: "/" });
  }, [user]);

  return (
    <div className="bg-[radial-gradient(circle_500px_at_top_left,#27505d,black)] md:bg-[radial-gradient(circle_900px_at_top_left,#27505d,black)] text-white min-h-screen p-2 md:p-0 md:pb-[300px]">
      <div className="pt-[100px] md:pt-[150px] flex flex-col">
        <div className="text-center text-4xl font-bold mb-10">All Courses</div>
        {enrolmentsLoading ? (
          <div>Loading enrolments...</div>
        ) : enrolmentsError ? (
          <div>Error loading enrolments</div>
        ) : enrolments ? (
          <div className="mx-auto">
            <div className="flex">
              <div className="w-[30px]">EID</div>
              <div className="w-[170px]">created at</div>
              <div className="w-[100px]">status</div>
              <div className="w-[100px] mr-2">username</div>
              <div className="w-[100px] mr-2">email</div>
              <div className="w-[100px]">course</div>
              <div className="w-[100px]">progress</div>
              <div className="w-[170px]">started at</div>
              <div className="w-[170px]">ended at</div>
            </div>
            {enrolments.map((e) => (
              <EnrolmentComponent key={e.enrolmentId} e={e} />
            ))}
            {isFetchingNextEnrolmentsPage && (
              <div className="py-3 text-sm text-[#a0a0a0]">Loading more...</div>
            )}
            <div
              className="bg-[#222222] h-[50px]"
              ref={enrolmentsSentinelRef}
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
