import { isErr } from "./is-err";
import { isPromise } from "./lib/is-promise";
import type { Result } from "./result";

/**
 * Returns the result if it is successful.
 * **Throws** the result error if it is not.
 */
export function unwrap<T>(result: Promise<Result<T>>): Promise<T>;
export function unwrap<T>(result: Result<T>): T;
export function unwrap<T>(result: Result<T> | Promise<Result<T>>): T | Promise<T> {
  if (isPromise(result)) {
    return result.then((awaited) => {
      if (isErr(awaited)) {
        throw awaited;
      }
      return awaited;
    });
  }
  if (isErr(result)) {
    throw result;
  }
  return result;
}
