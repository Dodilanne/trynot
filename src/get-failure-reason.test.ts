import { expect, test } from "vitest";
import { getFailureReason } from "./get-failure-reason";

class TestError extends Error {}

test("getFailureReason", () => {
  const msg = "MESSAGE";
  expect(getFailureReason(msg)).toBe(msg);
  expect(getFailureReason({ message: msg })).toBe(msg);
  expect(getFailureReason(new Error(msg))).toBe(msg);
  expect(getFailureReason(new TestError(msg))).toBe(msg);
  expect(getFailureReason({ data: { message: msg } })).toBe(msg);

  expect(getFailureReason()).toBe(undefined);
  expect(getFailureReason(undefined)).toBe(undefined);
  expect(getFailureReason(null)).toBe(undefined);
  expect(getFailureReason({})).toBe(undefined);
  expect(getFailureReason(new Error())).toBe(undefined);
  expect(getFailureReason(new TestError())).toBe(undefined);
  expect(getFailureReason({ data: { message: {} } })).toBe(undefined);
});
