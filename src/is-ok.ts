import { isErr } from "./is-err";
import type { Result } from "./result";

export function isOk<T>(result: Result<T>): result is T {
  return !isErr(result);
}
