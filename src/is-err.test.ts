import { expect, test } from "vitest";
import { isErr } from "./is-err";
import { errors, results } from "./lib/test-utils";

test("returns false when the result is not an error", () => {
  for (const result of results) {
    expect(isErr(result)).toBe(false);
  }
});

test("returns true when the result is an error", () => {
  for (const error of errors) {
    expect(isErr(error)).toBe(true);
  }
});
