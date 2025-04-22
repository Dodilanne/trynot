import { expect, test } from "vitest";
import { errors, results } from "./lib/test-utils";
import { unwrapOr } from "./unwrap-or";

test("handles results", async () => {
  for (const result of results) {
    expect(unwrapOr(result, "or")).toBe(result);
    await expect(unwrapOr(Promise.resolve(result), "or")).resolves.toBe(result);
  }
});

test("handles errors", async () => {
  for (const error of errors) {
    expect(unwrapOr(error, "or")).toBe("or");
    await expect(unwrapOr(Promise.resolve(error), "or")).resolves.toBe("or");
    await expect(unwrapOr(Promise.reject(error), "or")).resolves.toBe("or");
  }
});
