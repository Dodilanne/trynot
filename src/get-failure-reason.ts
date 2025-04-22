import { hasProperty } from "./lib/has-property";

/**
 * Tries to extract the message from an Error-like object.
 * @returns the extracted message if it is found.
 */
export function getFailureReason(error?: unknown): string | undefined {
  if (!error) {
    return undefined;
  }
  if (
    (error instanceof Error || hasProperty(error, "message")) &&
    typeof error.message === "string" &&
    error.message.length > 0
  ) {
    return error.message;
  }
  if (
    hasProperty(error, "data") &&
    hasProperty(error.data, "message") &&
    typeof error.data.message === "string" &&
    error.data.message.length > 0
  ) {
    return error.data.message;
  }
  if (typeof error === "string" && error.length > 0) {
    return error;
  }
  return undefined;
}
