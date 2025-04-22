import { expect, test } from "vitest";
import { errors, results } from "./lib/test-utils";
import type { Result } from "./result";
import { unwrap } from "./unwrap";

test("handles results", async () => {
  for (const result of results) {
    expect(unwrap(result)).toBe(result);
    await expect(unwrap(Promise.resolve(result))).resolves.toBe(result);
  }
});

test("handles errors", async () => {
  for (const error of errors) {
    expect(() => unwrap(error)).toThrow(error);
    await expect(() => unwrap(Promise.resolve(error))).rejects.toThrow(error);
    await expect(() => unwrap(Promise.reject(error))).rejects.toThrow(error);
  }
});

test("works recursively", () => {
  const invalidError = new Error("Only supports strings");
  let caught = false;
  function validateStringRecord(record: object): Result<true> {
    try {
      for (const value of Object.values(record)) {
        if (typeof value === "object" && value !== null) {
          return unwrap(validateStringRecord(value));
        }
        if (typeof value !== "string") {
          return invalidError;
        }
      }
      return true;
    } catch (error) {
      caught = true;
      return error as Error;
    }
  }
  const validRecord = { a: { name: "john", b: { name: "jane", age: "26" } } };
  expect(validateStringRecord(validRecord)).toBe(true);
  expect(caught).toBe(false);
  const invalidRecord = { a: { name: "john", b: { name: "jane", age: 26 } } };
  expect(validateStringRecord(invalidRecord)).toBe(invalidError);
  expect(caught).toBe(true);
});
