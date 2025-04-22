import { expect, test } from "vitest";
import { errors, results } from "./lib/test-utils";
import { unwrapOrElse } from "./unwrap-or-else";

test("handles results", async () => {
  for (const result of results) {
    expect(unwrapOrElse(result, () => "or")).toBe(result);
    await expect(unwrapOrElse(Promise.resolve(result), () => "or")).resolves.toBe(result);
  }
});

test("handles errors", async () => {
  for (const error of errors) {
    expect(unwrapOrElse(error, () => "or")).toBe("or");
    await expect(unwrapOrElse(Promise.resolve(error), () => "or")).resolves.toBe("or");
    await expect(unwrapOrElse(Promise.reject(error), () => "or")).resolves.toBe("or");
  }
});
