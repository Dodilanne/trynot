import { expect, test } from "vitest";
import { errors, results } from "./lib/test-utils";
import { unwrapOrUndefined } from "./unwrap-or-undefined";

test("handles results", async () => {
  for (const result of results) {
    expect(unwrapOrUndefined(result)).toBe(result);
    await expect(unwrapOrUndefined(Promise.resolve(result))).resolves.toBe(result);
  }
});

test("handles errors", async () => {
  for (const error of errors) {
    expect(unwrapOrUndefined(error)).toBeUndefined();
    await expect(unwrapOrUndefined(Promise.resolve(error))).resolves.toBeUndefined();
    await expect(unwrapOrUndefined(Promise.reject(error))).resolves.toBeUndefined();
  }
});
