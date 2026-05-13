import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type ArgumentTypes, client } from "./client";

type CreateEnrolmentArgs = ArgumentTypes<
  typeof client.api.v0.enrolments.$post
>[0]["json"];

async function createEnrolment(args: CreateEnrolmentArgs) {
  const res = await client.api.v0.enrolments.$post({ json: args });
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
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["enrolments"] });
    },
    onError: (error) => {
      if (onError) {
        onError(error.message);
      }
    },
  });
};
