import {
  infiniteQueryOptions,
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { type ArgumentTypes, client, type ExtractData } from "./client";

type CreateEnrolmentArgs = ArgumentTypes<
  typeof client.api.v0.enrolments.$post
>[0]["json"];

type UpdateEnrolmentArgs = ArgumentTypes<
  typeof client.api.v0.enrolments.update.$post
>[0]["json"];

// type AdminEnrolment = {
//   username: string;
//   email: string;
//   enrolmentId: number;
//   userId: string;
//   course:
//     | "python1"
//     | "python2"
//     | "frontend1"
//     | "frontend2"
//     | "backend1"
//     | "backend2"
//     | "practicum"
//     | "datacomm"
//     | "comparch";
//   status: "pending" | "active" | "completed" | "cancelled";
//   startedAt: Date | null;
//   endedAt: Date | null;
//   progress: number;
//   createdAt: Date;
// };

// type SerializeEnrolment = Extract<
//   ExtractData<
//     Awaited<ReturnType<(typeof client.api.v0.enrolments.all)["$get"]>>
//   >,
//   { enrolments: any[] }
// >["enrolments"][number];

// export function mapSerializedFinancialGoalToSchema(
//   serialized: SerializeEnrolment,
// ): AdminEnrolment {
//   return {
//     ...serialized,
//     startedAt: new Date(serialized.startedAt),
//     endedAt: new Date(serialized.endedAt),
//   };
// }

const TOKEN_KEY = "jwt_access_token";

export function getSession() {
  return localStorage.getItem(TOKEN_KEY);
}

export type EnrolmentsCursor = {
  enrolmentId: number;
} | null;

async function createEnrolment(args: CreateEnrolmentArgs) {
  const token = getSession();
  const res = await client.api.v0.enrolments.$post(
    { json: args },
    token ? { headers: { Authorization: `Bearer ${token}` } } : undefined,
  );
  if (!res.ok) {
    let errorMessage =
      "There was an issue creating your enrolment :( We'll look into it ASAP!";
    try {
      const errorResponse = await res.json();
      if (
        errorResponse &&
        typeof errorResponse === "object" &&
        "message" in errorResponse
      ) {
        errorMessage = String(errorResponse.message);
      }
    } catch (error) {
      console.error("Failed to parse error response:", error);
    }
    throw new Error(errorMessage);
  }
  const result = await res.json();
  if (!result.enrolment) {
    throw new Error("Invalid response from server");
  }
  return result.enrolment;
}

export const useCreateEnrolmentMutation = (
  onError?: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEnrolment,
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["enrolment", variables.course],
      });
    },
    onError: (error) => {
      if (onError) {
        onError(error.message);
      }
    },
  });
};

async function getEnrolment(course: string) {
  const token = getSession();
  const res = await client.api.v0.enrolments[":course"].$get(
    {
      param: { course: course.toString() },
    },
    token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : undefined,
  );
  if (!res.ok) {
    throw new Error("Error getting post by id");
  }
  const { enrolment } = await res.json();
  return enrolment ?? null;
}

export const getEnrolmentQueryOptions = (course: string) =>
  queryOptions({
    queryKey: ["enrolment", course],
    queryFn: () => getEnrolment(course),
    enabled: !!getSession(),
  });

async function getEnrolments(cursor?: number) {
  const token = getSession();
  const res = await client.api.v0.enrolments.$get(
    {
      query: cursor !== undefined ? { cursor: cursor.toString() } : {},
    },
    token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : undefined,
  );
  if (!res.ok) {
    throw new Error("Error getting enrolments");
  }
  const data = await res.json();
  return {
    enrolments: data.enrolments,
    nextCursor: data.nextCursor,
  };
}

export const getEnrolmentsInfiniteQueryOptions = () =>
  infiniteQueryOptions({
    queryKey: ["enrolments"],
    queryFn: ({ pageParam }) => getEnrolments(pageParam),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

async function getAdminEnrolments(cursor?: number) {
  const token = getSession();
  const res = await client.api.v0.enrolments.all.$get(
    {
      query: cursor !== undefined ? { cursor: cursor.toString() } : {},
    },
    token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : undefined,
  );
  if (!res.ok) {
    throw new Error("Error getting all enrolments");
  }
  const data = await res.json();
  return {
    enrolments: data.enrolments,
    nextCursor: data.nextCursor,
  };
}

export const getAdminEnrolmentsInfiniteQueryOptions = () =>
  infiniteQueryOptions({
    queryKey: ["enrolments", "all"],
    queryFn: ({ pageParam }) => getAdminEnrolments(pageParam),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

async function UpdateEnrolment(args: UpdateEnrolmentArgs) {
  const token = getSession();
  const res = await client.api.v0.enrolments.update.$post(
    { json: args },
    token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : undefined,
  );
}

export const useUpdateEnrolmentMutation = (
  onError?: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UpdateEnrolment,
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["enrolments"],
      });
    },
    onError: (error) => {
      if (onError) {
        onError(error.message);
      }
    },
  });
};
