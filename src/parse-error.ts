import { getFailureReason } from "./get-failure-reason";

export function parseError(error: unknown): Error {
  if (error instanceof Error) {
    return error;
  }
  const reason = getFailureReason(error) ?? "Unknown error";
  return new Error(reason);
}
