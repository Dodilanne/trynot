import { expect, test } from "vitest";
import { isOk } from "./is-ok";
import { errors, results } from "./lib/test-utils";

test("returns true when the result is not an error", () => {
  for (const result of results) {
    expect(isOk(result)).toBe(true);
  }
});

test("returns false when the result is an error", () => {
  for (const error of errors) {
    expect(isOk(error)).toBe(false);
  }
});
